workflow "New workflow" {
  on = "push"
  resolves = ["Build", "Lint", "Test", "Filter for master only", "Login to Heroku", "Push to Heroku", "Deploy to Heroku"]
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install"
}

action "Lint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  runs = "npm run lint"
}

action "Test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build"]
  runs = "npm run test"
}

action "Filters for master only" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  needs = ["Lint", "Test"]
  args = "branch master"
}

action "Login to Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Filters for master only"]
  runs = "container:login"
  secrets = ["HEROKU_API_KEY"]
}

action "Push to Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Login to Heroku"]
  runs = "container:push -a banshee-44-mods-bot web"
  secrets = ["HEROKU_API_KEY"]
}

action "Deploy to Heroku" {
  uses = "actions/heroku@466fea5e8253586a6df75b10e95447b0bfe383c1"
  needs = ["Push to Heroku"]
  runs = "container:release -a banshee-44-mods-bot web"
  secrets = ["HEROKU_API_KEY"]
}
