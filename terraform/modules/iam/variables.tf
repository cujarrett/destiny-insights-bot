variable "dynamodb-table-banshee-44-mods-backend-mods-arn" {
  description = "banshee-44-mods-backend-mods DynamoDB table ARN"
  type = string
}

variable "error-sns-topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "parameter-store-twitter-auth-arn" {
  description = "Parameter Store twitter auth config path ARN"
  type = string
}
