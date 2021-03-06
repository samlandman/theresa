require 'uri'
require 'net/http'

class WalksController < ApplicationController

  skip_before_action :authorized, only: [:index]
  # respond_to :js, :html, :json

  def index
    @walks = Walk.all
    if @walks.count > 0
      @latitude = @walks[0].coordinates_start.split(',')[0].tr("{","").to_f
      p @latitude
      @longitude = @walks[0].coordinates_start.split(',')[-1].tr("}","").to_f
    else
      @latitude = 41.45
      @longitude = -0.05
    end
    @walkywalks =  []
    @walks.each do |walk|
      @walkywalks << {latitude: walk.coordinates_start.split(',')[0].tr("{","").to_f, longitude: walk.coordinates_start.split(',')[-1].tr("}","").to_f, id: walk.id, title: walk.title, para: walk.description}
    end
  end

  def show
    @walk = Walk.find(params[:id])
  end

  def new
    @walk = Walk.new
  end

  def edit
    @walk = Walk.find(params[:id])
  end

  def create
    @walk = Walk.new(walk_params.merge(user_id: current_user.id))
    p @walk.coordinates_start
    if @walk.coordinates_start == ""
      p "Coordinates is nil!"
      random_coordinates(@walk)
      p "we should have refresed the coordinates"
    end
    @walk.save
    redirect_to @walk
  end

  def update
    @walk = Walk.find(params[:id])
   
    if @walk.update(walk_params)
      redirect_to @walk
    else
      render 'edit'
    end
  end

  def destroy
    @walk = Walk.find(params[:id])
    @walk.destroy
 
    redirect_to walks_path
  end

  def like
    @walk = Walk.find(params[:id])
    if params[:format] == "like"
      @walk.liked_by current_user
      redirect_to @walk
    elsif params[:format] == "unlike"
      @walk.unliked_by current_user
      redirect_to @walk
    end
  end

  private
    def walk_params
      params.require(:walk).permit(:photo, :title, :description, :coordinates_start, :coordinates_end, :distance, :tag_list)
    end

    def random_coordinates(walk)
      url = URI("https://api.postcodes.io/random/postcodes")

      http = Net::HTTP.new(url.host, url.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE

      request = Net::HTTP::Get.new(url)

      response = http.request(request)
      response_text = response.read_body.split(",")
      longitude = response_text[7].split(":")[1]
      latitude = response_text[8].split(":")[1]
      coordinates = "{#{latitude},#{longitude}}"
      walk.coordinates_start = coordinates
      walk.save
    end
end
