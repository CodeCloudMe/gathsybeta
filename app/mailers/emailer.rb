class Emailer < ActionMailer::Base
  default :from => "notifications@http://gathsykirk.herokuapp.com"
 
  def welcome_email(user)
    @user = user
    @url  = "http://gathsykirk.herokuapp.com"
    @from = 'ignite@kirkclarke.com'
    mail(:to => user.email, :subject => "Welcome to My Awesome Site", :from => @from)
  end
end