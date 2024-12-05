import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, CreditCard } from 'lucide-react';

const LeagueSetupWizard = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    leagueName: '',
    numberOfTeams: '',
    leagueType: '',
    paymentStatus: false
  });

  const LEAGUE_PRICES = {
    standard: 50,
    premium: 199
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Mock payment processing
      console.log('Processing payment...');
      
      // Send data to backend
      const response = await fetch('/api/leagues/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leagueName: formData.leagueName,
          numberOfTeams: formData.numberOfTeams,
          leagueType: formData.leagueType,
          price: LEAGUE_PRICES[formData.leagueType]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create league');
      }

      // Close wizard on success
      onClose();
      
      // You might want to add a success notification here
      console.log('League created successfully!');
    } catch (error) {
      console.error('Error creating league:', error);
      // Handle error (show error message to user)
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">Create Your Fantasy Football League</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">League Name</label>
          <input
            type="text"
            name="leagueName"
            value={formData.leagueName}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm"
            placeholder="Enter your league name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of Teams</label>
          <select
            name="numberOfTeams"
            value={formData.numberOfTeams}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm"
            required
          >
            <option value="">Select number of teams</option>
            <option value="4">4 Teams</option>
            <option value="6">6 Teams</option>
            <option value="8">8 Teams</option>
            <option value="10">10 Teams</option>
            <option value="12">12 Teams</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setStep(2)}
          disabled={!formData.leagueName || !formData.numberOfTeams}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">Choose Your League Type</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Standard Option */}
        <div 
          className={`border rounded-xl p-4 cursor-pointer hover:border-blue-500 transition-all h-full ${
            formData.leagueType === 'standard' ? 'border-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => handleInputChange({ target: { name: 'leagueType', value: 'standard' }})}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-lg font-semibold">Standard League</h4>
              <p className="text-2xl font-bold text-blue-600">$50</p>
            </div>
            {formData.leagueType === 'standard' && (
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <Check size={16} />
              </div>
            )}
          </div>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>H2H League</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>Guillotine League</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>Turkey Bowl</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>Christmas Bowl</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>H2H Playoffs</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>NFL Playoff Player Pool</span>
            </li>
          </ul>
        </div>
  
        {/* Premium Option */}
        <div 
          className={`border rounded-xl p-4 cursor-pointer hover:border-blue-500 transition-all h-full ${
            formData.leagueType === 'premium' ? 'border-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => handleInputChange({ target: { name: 'leagueType', value: 'premium' }})}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-lg font-semibold">Daily Fantasy King</h4>
              <p className="text-2xl font-bold text-blue-600">$199</p>
            </div>
            {formData.leagueType === 'premium' && (
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <Check size={16} />
              </div>
            )}
          </div>
          <div className="text-sm font-medium text-blue-600 mb-2">
            Includes all Standard features plus:
          </div>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>Access to Data Science Platform</span>
            </li>
            <li className="flex items-center gap-2">
              <Check size={14} className="text-green-500 flex-shrink-0" />
              <span>Available for all team members</span>
            </li>
          </ul>
        </div>
      </div>
  
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(1)}
          className="flex items-center space-x-2 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!formData.leagueType}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-center">Confirm Your League</h3>
      
      {/* Summary Section */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h4 className="font-medium">League Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>League Name:</div>
          <div className="font-medium">{formData.leagueName}</div>
          
          <div>Number of Teams:</div>
          <div className="font-medium">{formData.numberOfTeams}</div>
          
          <div>League Type:</div>
          <div className="font-medium">
            {formData.leagueType === 'premium' ? 'Daily Fantasy King' : 'Standard League'}
          </div>
          
          <div>Price:</div>
          <div className="font-medium">${LEAGUE_PRICES[formData.leagueType]}</div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="text-blue-600" />
          <h4 className="font-medium">Payment Details</h4>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Complete your league creation by proceeding to payment.
          </p>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Pay ${LEAGUE_PRICES[formData.leagueType]}
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(2)}
          className="flex items-center space-x-2 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch(step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default LeagueSetupWizard;