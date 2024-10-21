import { aws_cognito, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IdentityDetails } from '../interfaces/identity-details';

interface IdentityProviderStackProps extends StackProps {
  tenantId: string;
}

// This is the domain that we will use to redirect the user to the login page
// It will need to be updated to the domain that you are using for your CloudFront distribution
// Better yet, this should be a custom domain in Route 53 and then that domain can be here
const loginDomainUrl = 'dzua8yen93nwp.cloudfront.net'

export class IdentityProvider extends Construct {
  public readonly tenantUserPool: aws_cognito.UserPool;
  public readonly tenantUserPoolClient: aws_cognito.UserPoolClient;
  public readonly identityDetails: IdentityDetails;
  constructor(scope: Construct, id: string, props: IdentityProviderStackProps) {
    super(scope, id);

    this.tenantUserPool = new aws_cognito.UserPool(this, 'tenantUserPool', {
      autoVerify: { email: true },
      accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY,
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      userInvitation: {
        emailSubject: 'Your invite to join Serverless SaaS',
        emailBody: `Hello {username},\n\nYou have been invited to join our serverless SaaS service. Please use the following link to login and complete your registration:\n${loginDomainUrl}\n\nYour temporary password is {####}`,
      },
      customAttributes: {
        tenantId: new aws_cognito.StringAttribute({
          mutable: true,
        }),
        userRole: new aws_cognito.StringAttribute({
          mutable: true,
        }),
        apiKey: new aws_cognito.StringAttribute({
          mutable: true,
        }),
        // adding this new custom attribute so that we can determine which API Key
        // to use without having to hit an external db in the lambda tenant_authorizer function
        tenantTier: new aws_cognito.StringAttribute({
          mutable: true,
        }),
      },
    });

    const writeAttributes = new aws_cognito.ClientAttributes()
      .withStandardAttributes({ email: true })
      .withCustomAttributes('tenantId', 'userRole', 'apiKey', 'tenantTier');

    this.tenantUserPoolClient = new aws_cognito.UserPoolClient(this, 'tenantUserPoolClient', {
      userPool: this.tenantUserPool,
      generateSecret: false,
      authFlows: {
        userPassword: true,
        adminUserPassword: false,
        userSrp: true,
        custom: false,
      },
      writeAttributes: writeAttributes,
      oAuth: {
        scopes: [
          aws_cognito.OAuthScope.EMAIL,
          aws_cognito.OAuthScope.OPENID,
          aws_cognito.OAuthScope.PROFILE,
        ],
        flows: {
          authorizationCodeGrant: true,
          implicitCodeGrant: true,
        },
      },
    });

    this.identityDetails = {
      name: 'Cognito',
      details: {
        userPoolId: this.tenantUserPool.userPoolId,
        appClientId: this.tenantUserPoolClient.userPoolClientId,
      },
    };
  }
}
