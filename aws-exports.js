/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cloud_logic_custom": [
        {
            "name": "APIKeyManager",
            "endpoint": "https://yzg6fs9jvg.execute-api.us-east-1.amazonaws.com/production",
            "region": "us-east-1"
        },
        {
            "name": "TodoAPI",
            "endpoint": "https://1iojqw44tj.execute-api.us-east-1.amazonaws.com/production",
            "region": "us-east-1"
        }
    ],
    "aws_cognito_identity_pool_id": "us-east-1:27cfe599-2244-4ccd-b5cf-7d92690bca21",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_TjXYqlPfH",
    "aws_user_pools_web_client_id": "4kcbuagtnj88a4i9q75nc354bq",
    "oauth": {},
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "APIKeyDB-production",
            "region": "us-east-1"
        },
        {
            "tableName": "TodoListDB-production",
            "region": "us-east-1"
        },
        {
            "tableName": "TodoListItemDB-production",
            "region": "us-east-1"
        }
    ]
};


export default awsmobile;
