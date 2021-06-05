module "archive" {
  source = "./modules/archive"
}

module "dynamodb" {
  source = "./modules/dynamodb"
}

module "iam" {
  source = "./modules/iam"
  error_sns_topic = var.error_sns_topic
  destiny_insights_mods_arn = module.dynamodb.destiny_insights_mods_arn
  destiny_insights_xur_arn = module.dynamodb.destiny_insights_xur_arn
  parameter_store_twitter_auth_arn = var.parameter_store_twitter_auth_arn
}

module "event_bridge" {
  source = "./modules/event_bridge"
}

module "lambda" {
  source = "./modules/lambda"
  error_sns_topic = var.error_sns_topic
  data_archive_file_placeholder_output_path = module.archive.data_archive_file_placeholder_output_path
  aws_iam_role_destiny_insights_bot_arn = module.iam.aws_iam_role_destiny_insights_bot_arn
  aws_cloudwatch_event_rule_once_daily_at_destiny_reset_arn = module.event_bridge.aws_cloudwatch_event_rule_once_daily_at_destiny_reset_arn
  aws_cloudwatch_event_rule_once_daily_at_destiny_reset_name = module.event_bridge.aws_cloudwatch_event_rule_once_daily_at_destiny_reset_name
}
