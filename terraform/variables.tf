variable "aws_region" {
  description = "Region for the infrastructure"
  type = string
  default = "us-east-1"
}

variable "error_sns_topic" {
  description = "SNS Topic ARN to trigger on lambda failure"
  type = string
}

variable "parameter_store_twitter_auth_arn" {
  description = "Parameter Store twitter auth config path ARN"
  type = string
}
