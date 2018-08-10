class PlacesController < ApplicationController
    before_action :set_place

    # GET /todos
  def index
    @places = Place.all
    json_response(@places)
  end

  def set_place
    @place = Place.find(params[:id])
  end
end
