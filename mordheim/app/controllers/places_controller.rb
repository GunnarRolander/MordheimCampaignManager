class PlacesController < ApplicationController
  include Response
  before_action :set_place, only: :get_place

    # GET /todos
  def index
    @places = Place.all
    json_response(@places)
  end

  def get_place
    json_response(@place)
  end

  private

  def set_place
    @place = Place.find(params[:id])
  end
end
