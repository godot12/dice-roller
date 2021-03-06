$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "dice-roller/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "dice-roller"
  s.version     = DiceRoller::VERSION
  s.authors     = ["Vicente Mundim"]
  s.email       = ["vicente.mundim@gmail.com"]
  s.summary     = "A javascript dice roller component made in AngularJS."
  s.description = "A javascript dice roller component made in AngularJS."

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", '>= 3.2.0'
  s.add_dependency "sass-rails"
  s.add_dependency "compass-rails"

  s.add_development_dependency "sqlite3"
end
