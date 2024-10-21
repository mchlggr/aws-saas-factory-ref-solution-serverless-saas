# Serverless SaaS - Reference Solution

This serverless saas reference solution is built using [SaaS Builder Toolkit (SBT)](https://github.com/awslabs/sbt-aws) control plane and core application plane components.

We have also created a workshop that you can use as a reference to understand this reference solution in a step-by-step fashion. Workshop is available [here](https://github.com/aws-samples/aws-serverless-saas-workshop).

**[Feedback & Feature request](https://www.pulse.aws/survey/EHE3TICQ)** | **[Documentation](DOCUMENTATION.md)**

## Pre-requisites

- This reference architecture uses Python. Make sure you have Python 3.9 or above installed.
- Make sure you have [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) installed.
- Make sure you have the latest version of [AWS CDK CLI](https://docs.aws.amazon.com/cdk/latest/guide/cli.html) installed. Not having the release version of CDK can cause deployment issues.
- Make sure you have the latest version of [git-remote-codecommit](https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-git-remote-codecommit.html) installed.
- Make sure that you have Node 18 or above.

## Generating Local SSL Certificates for Local Development
Open `cd ./clients/certs` and run `./generate-local-certs.sh` to generate a self-signed SSL certificate for your local development server.
This will create a self-signed certificate self-signed.crt and a corresponding private key self-signed.key in a directory named certs.

***Important Notes:***

- ***Do NOT use these certificates in production. Self-signed certificates are intended for development purposes only.***
- ***Avoid committing the certificates to source control for security reasons.***

## Deploying

To deploy this reference solution run below script. Replace the "test@example.com" email address with yours. This email address will be used to setup an admin user in the control plane of this reference solution.

```bash
cd scripts
./install.sh test@example.com
```

This script will deploy the following:

- Creates a codecommit repo in your AWS account and pushes this reference solutions code to the repo
- Clones SaaS Builder Toolkit(SBT) control plane repo and installs control plane which has all shared services and control plane UI.
- Deploys cdk stack `serverless-saas-ref-arch-bootstrap-stack` which provisions
  - SaaS Builder Toolkit(SBT) core application plane component which provides infrastructure to provision/de-provision a tenant
  - Infrastructure to host a saas application UI and also deploys this saas application UI.
- Deploys pooled tenant cdk stack `serverless-saas-ref-arch-tenant-template-pooled`, which deploys cognito userpool and multi-tenant order & product services.
- Deploys cdk stack `ServerlessSaaSPipeline` which provisions Tenant Pipeline.This pipeline uses CodePipeline and is responsible for auto updating the stack for all the tenants in an automated fashion.

## Steps to Clean-up

Run below script to clean up

```bash
cd scripts
./cleanup.sh
```

## Running the Debugger

Lambdas can be debugged locally with AWS SAM. To prepare AWS lambda for local debugging, first export an initial SAM template directly from the Lambda console to use as a starting point for your local lambda template. Then, simplify the local developer lambda template using the exported SAM files. Ensure that Lambda Layers are correctly configured to share code among different services. It may also be helpful to inspect values from the lambda logs for the input.

To debug from Pycharm, follow the steps below:

1. Open your project in PyCharm. 
2. Configure AWS Toolkit:
   - to Settings/Preferences > AWS Toolkit.
   - Set up your AWS credentials if needed
3.	Set up a Run/Debug Configuration:
   - Click on Run > Edit Configurations.
   - Add a new AWS SAM Application configuration.
   - Select your SAM template file and specify the Lambda function to debug. 
4. Set breakpoints in your code where needed. 
5. Start debugging:
   - Click on the debug icon or press Shift+F9. 
   - The debugger will pause at the specified breakpoints.

Example PyCharm run configurations are included here:
- [PostUser.run.xml](.run/%5BLocal%5D%20UserFunctionHandler%20-_%20Post.run.xml)
- [GetProduct.run.xml](.run/Dev%20-_%20Get%20Product.run.xml)