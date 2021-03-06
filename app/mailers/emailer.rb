class Emailer < ActionMailer::Base
  default :from => "notifications@http://gathsy.com"
 
  def welcome_email(user)
    @user = user
    @url  = "http://gathsy.com"
    @from = 'info@gathsy.com'
    mail(:to => user.email, :subject => "Welcome to Gathsy", :from => @from)
  end

   def new_space_email(user)
    @user = user
    @url  = "http://gathsy.com"
    @from = 'info@gathsy.com'
    mail(:to => user.email, :subject => "<div style='font-size:20px'>You've created a new space on Gathsy</div>", :from => @from)
  end

  def book_email(user)
    @user = user
    @url  = "http://gathsy.com"
    @from = 'info@gathsy.com'
    mail(:to => user.email, :subject => "New Booking Created", :from => @from)
  end

  def approve_email(user)
    @user = user
    @url  = "http://gathsy.com"
    @from = 'info@gathsy.com'
    mail(:to => user.email, :subject => "Booking Approved", :from => @from)
  end

  def decline_email(user)
    @user = user
    @url  = "http://gathsy.com"
    @from = 'info@gathsy.com'
    mail(:to => user.email, :subject => "Booking Declined", :from => @from)
  end

end