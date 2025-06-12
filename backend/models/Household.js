const mongoose = require('mongoose');

const HouseholdSchema = new mongoose.Schema({
  household_id: String,
  head_of_household: String,
  latitude: Number,
  longitude: Number,
  waste_type_preference: String,
  fee_status: String,
  collection_frequency: String
});

module.exports = mongoose.model('Household', HouseholdSchema);