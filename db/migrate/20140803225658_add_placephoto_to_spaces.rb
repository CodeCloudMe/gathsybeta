class AddPlacephotoToSpaces < ActiveRecord::Migration
  def change
    add_column :spaces, :placeavatar1, :string
  end
end
