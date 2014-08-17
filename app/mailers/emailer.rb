class Emailer < ActionMailer::Base
  default :from => "notifications@http://gathsykirk.herokuapp.com"
 
  def welcome_email(user)
    @user = user
    @url  = "http://gathsykirk.herokuapp.com"
    @from = 'info@gathsykirk.herokuapp.com'
    mail(:to => user.email, :subject => "Welcome to Gathsy", :from => @from)
  end

  def booking_created_email(user)
    @user = user
    @url  = "http://gathsykirk.herokuapp.com"
    @from = 'info@gathsykirk.herokuapp.com'
    mail(:to => user.email, :subject => "New Booking Created", :from => @from)
  end

  def confirm_email(user)
    @user = user
    @url  = "http://gathsykirk.herokuapp.com"
    @from = 'info@gathsykirk.herokuapp.com'
    mail(:to => user.email, :subject => "Booking Confirmed", :from => @from)
  end

   def not_accepted_email(user)
    @user = user
    @url  = "http://gathsykirk.herokuapp.com"
    @from = 'info@gathsykirk.herokuapp.com'
    mail(:to => user.email, :subject => "Booking Not Accepted", :from => @from)
  end

  def cancel_email(user)
    @user = user
    @url  = "http://gathsykirk.herokuapp.com"
    @from = 'info@gathsykirk.herokuapp.com'
    mail(:to => user.email, :subject => "Booking Cancelled", :from => @from)
  end

end