resource "aws_lambda_function" "banshee-44-mods-bot" {
  filename      = var.data-archive-file-placeholder-output-path
  function_name = "banshee-44-mods-bot"
  handler       = "index.handler"
  role          = var.aws-iam-role-banshee-44-mods-bot-arn
  runtime       = "nodejs12.x"
  memory_size   = 128
  timeout       = 30
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_banshee-44-mods-bot" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.banshee-44-mods-bot.function_name
  principal     = "events.amazonaws.com"
  source_arn    = var.aws-cloudwatch-event-rule-once-daily-at-destiny-reset-arn
}

resource "aws_lambda_function_event_invoke_config" "banshee-44-mods-bot-event-invoke-config" {
  function_name = aws_lambda_function.banshee-44-mods-bot.arn
  maximum_event_age_in_seconds = 60
  maximum_retry_attempts       = 2

  destination_config {
    on_failure {
      destination = var.error_sns_topic
    }
  }
}

resource "aws_cloudwatch_event_target" "banshee-44-mods-bot" {
  rule      = var.aws-cloudwatch-event-rule-once-daily-at-destiny-reset-name
  target_id = "lambda"
  arn       = aws_lambda_function.banshee-44-mods-bot.arn
}
