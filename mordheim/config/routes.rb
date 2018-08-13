Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Warbands
  get 'warband/:warband_id', to: 'warbands#get_warband'
  get 'warband/:warband_id/visible_places', to: 'warbands#visible_places'
  get 'warband/:warband_id/moveable_places', to: 'warbands#moveable_places'
  get 'warband/:warband_id/coming_battles', to: 'warbands#get_coming_battles'
  get 'warband/:warband_id/fought_battles', to: 'warbands#get_fought_battles'
  post 'warband/:warband_id/move_warband', to: 'warbands#move_warband'

  # Actions
  post 'actions/register_action', to: 'actions#register_action'

  # Battles
  get 'battles', to: 'battles#get_battles'
  post 'battles/register_result', to: 'battles#register_result'

  # Places
  get 'places', to: 'places#index'
  get 'places/:id', to: 'places#get_place'

  # Turn
  get 'turn', to: 'turns#get_turn'
  post 'turn/next_turn', to: 'turns#next_turn'
  post 'turn/next_phase', to: 'turns#next_phase'

end
