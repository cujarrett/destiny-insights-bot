variable "error-sns-topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "parameter-store-twitter-access-token-arn" {
  description = "Parameter Store twitter-access-token ARN"
  type = string
}

variable "parameter-store-twitter-access-token-secret-arn" {
  description = "Parameter Store twitter-access-token-secret ARN"
  type = string
}

variable "parameter-store-twitter-consumer-api-key-arn" {
  description = "Parameter Store twitter-consumer-api-key ARN"
  type = string
}

variable "parameter-store-twitter-consumer-secret-arn" {
  description = "Parameter Store twitter-consumer-secret ARN"
  type = string
}

variable "aws-dynamodb-table-banshee-44-mods-bot-arn" {
  description = "DynamoDB table ARN"
  type = string
}
