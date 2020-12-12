variable "error-sns-topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "parameter-store-twitter-access-token-arn" {
  description = "Parameter Store twitter-access-token ARN"
  type = string
}

variable "parameter-store-twitter-auth-arn" {
  description = "Parameter Store twitter auth config path ARN"
  type = string
}
