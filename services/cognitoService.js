require("dotenv").config();
const { CognitoIdentityProviderClient, SignUpCommand, AdminConfirmSignUpCommand, InitiateAuthCommand, GetUserCommand } = require('@aws-sdk/client-cognito-identity-provider')
const cognitoClient = new CognitoIdentityProviderClient(
    { 
        region: "eu-south-1" 
    }
);

const cognitoService = {
    signUp: async (user) => {
        if(!user) {
            throw new Error("Empty user");
        }
        if(!user.username) {
            throw new Error("Username not specified");
        }
        if(!user.email) {
            throw new Error("Email not specified");
        }
        if(!user.password) {
            throw new Error("Password not specified");
        }

        var input = {
            ClientId: process.env.AWS_USER_POOL_CLIENT_ID,
            Username: user.username,
            Password: user.password,
            UserAttributes: [
              { 
                Name: "email",
                Value: user.email
              }
            ]
        };
        var command = new SignUpCommand(input);
        try {
            await cognitoClient.send(command);
            return true;
        } catch(error) {
            throw new Error("Error in cognito");
        }
    },
    login: async (user) => {
        if(!user) {
            throw new Error("Empty user");
        }
        if(!user.username) {
            throw new Error("Username not specified");
        }
        if(!user.password) {
            throw new Error("Email not specified");
        }
        
        var input = {
            ClientId: process.env.AWS_USER_POOL_CLIENT_ID,
            AuthFlow: "USER_PASSWORD_AUTH",
            AuthParameters: {
              USERNAME: user.username,
              PASSWORD: user.password
            }
        };
        const command = new InitiateAuthCommand(input);
        try {
          var response = await cognitoClient.send(command);
          return response.AuthenticationResult.AccessToken;
        } catch(error) {
            throw new Error("Error in cognito.");
        }
    },
    getUserInfo: async(token) => {
        if(!token) {
            throw new Error("Empty token");
        }

        var input = {
            AccessToken: token
        };

        const command = new GetUserCommand(input);
        
        try {
            const response = await cognitoClient.send(command);
            var userId = response.UserAttributes.find((attribute) => attribute.Name == 'sub').Value;
            var isAdminAttribute = response.UserAttributes.find((attribute) => attribute.Name == 'custom:isAdmin');
            var isAdmin = (isAdminAttribute ? isAdminAttribute.Value : 0);
            var userInfo = {
                userId: userId,
                isAdmin: isAdmin
            }
            return userInfo;
        } catch(error) {
            throw new Error("Error in cognito.");
        }
    }
}
module.exports = cognitoService;