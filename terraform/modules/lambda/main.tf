resource "aws_lambda_function" "destiny_insights_bot" {
  filename      = var.data_archive_file_placeholder_output_path
  function_name = "destiny-insights-bot"
  handler       = "index.handler"
  role          = var.aws_iam_role_destiny_insights_bot_arn
  runtime       = "nodejs14.x"
  memory_size   = 128
  timeout       = 60
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_destiny_insights_bot" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.destiny_insights_bot.function_name
  principal     = "events.amazonaws.com"
  source_arn    = var.aws_cloudwatch_event_rule_once_daily_at_destiny_reset_arn
}

resource "aws_lambda_function_event_invoke_config" "destiny_insights_bot_event_invoke_config" {
  function_name = aws_lambda_function.destiny_insights_bot.arn
  maximum_event_age_in_seconds = 60
  maximum_retry_attempts       = 2

  destination_config {
    on_failure {
      destination = var.error_sns_topic
    }
  }
}

resource "aws_cloudwatch_event_target" "destiny_insights_bot" {
  rule      = var.aws_cloudwatch_event_rule_once_daily_at_destiny_reset_name
  target_id = "lambda"
  arn       = aws_lambda_function.destiny_insights_bot.arn
}
