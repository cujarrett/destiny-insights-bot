module "archive" {
  source = "./modules/archive"
}

module "iam" {
  source = "./modules/iam"
  error-sns-topic = var.error-sns-topic
  parameter-store-twitter-auth-arn = var.parameter-store-twitter-auth-arn
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
