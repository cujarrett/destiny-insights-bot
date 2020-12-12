module "archive" {
  source = "./modules/archive"
}

module "dynamodb" {
  source = "./modules/dynamodb"
}

module "iam" {
  source = "./modules/iam"
  error-sns-topic = var.error-sns-topic
  aws-dynamodb-table-banshee-44-mods-bot-arn = module.dynamodb.aws-dynamodb-table-banshee-44-mods-bot-arn
  parameter-store-twitter-access-token-arn = var.parameter-store-twitter-access-token-arn
  parameter-store-twitter-access-token-secret-arn = var.parameter-store-twitter-access-token-secret-arn
  parameter-store-twitter-consumer-api-key-arn = var.parameter-store-twitter-consumer-api-key-arn
  parameter-store-twitter-consumer-secret-arn = var.parameter-store-twitter-consumer-secret-arn
}

module "event-bridge" {
  source = "./modules/event-bridge"
}

module "lambda" {
  source = "./modules/lambda"
  error-sns-topic = var.error-sns-topic
  data-archive-file-placeholder-output-path = module.archive.data-archive-file-placeholder-output-path
  aws-iam-role-banshee-44-mods-bot-arn = module.iam.aws-iam-role-banshee-44-mods-bot-arn
  aws-cloudwatch-event-rule-once-daily-at-destiny-reset-arn = module.event-bridge.aws-cloudwatch-event-rule-once-daily-at-destiny-reset-arn
  aws-cloudwatch-event-rule-once-daily-at-destiny-reset-name = module.event-bridge.aws-cloudwatch-event-rule-once-daily-at-destiny-reset-name
}
