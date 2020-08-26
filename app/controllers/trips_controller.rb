class TripsController < ApplicationController
  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.create(trip_params.merge(user_id: current_user.id))
    p @trip
    @trip.save
    redirect_to '/trips'
  end

  def index
    @trips = Trip.all
    p @trips
  end

  def mytrips
    @trips = Trip.all
  end

  def show
    @tag = Tag.find(params[:id])
  end

  # def create
  #   @walk = Walk.find(params[:walk_id])
  #   @tag = @walk.tags.create(tag_params.merge(walk_id: walk.id))
  # end

  def destroy
    @walk = Walk.find(params[:walk_id])
    @tag = @walk.tags.find(params[:id])
    @tag.destroy
    redirect_to walk_path(@walk)
  end

  private
  def trip_params
    params.require(:trip).permit(:name)
  end

end
