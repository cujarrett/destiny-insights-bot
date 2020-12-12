variable "error-sns-topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "parameter-store-twitter-auth-arn" {
  description = "Parameter Store twitter auth config path ARN"
  type = string
}

variable "aws-dynamodb-table-banshee-44-mods-bot-arn" {
  description = "DynamoDB table ARN"
  type = string
}
