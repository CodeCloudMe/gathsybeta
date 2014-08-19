class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  skip_before_filter :require_login, only: [:index, :new, :create]

  def show
    @user = User.find(params[:id])

    @spaces = @user.spaces.page(selected_page)
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(params[:user])
    if params[:user][:email]
      @user.email = params[:user][:email].downcase
    end


    if @user.save
      # Tell the UserMailer to send a welcome Email after save
      Emailer.welcome_email(@user).deliver
      user_photo = UserPhoto.unattached_photo
      #user_photo.update_attributes(user_id: @user.id)
      login_user!(@user)
      redirect_to spaces_url
    else
      flash.now[:errors] = @user.errors
      render :new
    end

  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
   
   def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end
