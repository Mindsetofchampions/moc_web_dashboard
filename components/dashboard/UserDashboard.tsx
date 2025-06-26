//app/components/dashboard/UserDashboard.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

interface UserDashboardProps {
  userName?: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userName }) => {
  const upcomingEvents = [
    {
      facility: "Elder Care Facility",
      date: "02/07/2025",
      frequency: "Weekly",
      address: "123 Made Up Blvd, Philadelphia, PA 19125",
      spots: "8 / 10 Spots Filled"
    },
    {
      facility: "Elder Care Facility",
      date: "02/07/2025",
      frequency: "Weekly",
      address: "123 Made Up Blvd, Philadelphia, PA 19125",
      spots: "8 / 10 Spots Filled"
    },
    {
      facility: "Elder Care Facility",
      date: "02/07/2025",
      frequency: "Weekly",
      address: "123 Made Up Blvd, Philadelphia, PA 19125",
      spots: "8 / 10 Spots Filled"
    }
  ];

  const recentTransactions = [
    {
      icon: "donation",
      title: "Donation to SSMB Spring Slam!",
      date: "28 January 2021",
      amount: "-$400",
      color: "red"
    },
    {
      icon: "refill",
      title: "Donation Account Refill",
      date: "25 January 2021",
      amount: "+$500",
      color: "green"
    },
    {
      icon: "gained",
      title: "Donations gained from MoC 5K",
      date: "21 January 2021",
      amount: "+$1,400",
      color: "green"
    }
  ];

  return (
    <div style={{ backgroundColor: "transparent", padding: "20px", minHeight: "100vh" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center bg-[#FFFFFFCC] bg-opacity-80 rounded-3xl p-4 h-[120px]">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Hours Donated</p>
            <p className="text-2xl font-bold text-black ">120</p>
          </div>
        </div>

        <div className="flex items-center bg-[#FFFFFFCC] bg-opacity-80 rounded-3xl p-4">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Funds Donated</p>
            <p className="text-2xl font-bold text-black">$20,000</p>
          </div>
        </div>

        <div className="flex items-center bg-[#FFFFFFCC] bg-opacity-80 rounded-3xl p-4">
          <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-pink-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Students Reached</p>
            <p className="text-2xl font-bold text-black">1,224</p>
          </div>
        </div>

        <div className="flex items-center bg-[#FFFFFFCC] bg-opacity-80 rounded-3xl p-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Events Created</p>
            <p className="text-2xl font-bold text-black">2</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
      <h3 className="text-red-500 font-bold mb-2">Weekly Activity</h3>
      <div className="bg-[#FFFFFFCC] rounded-3xl p-4">
        <div className="h-64">
          <div className="flex justify-end mb-4 space-x-4 mr-10">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#16DBCC] mr-2"></div>
              <span className="text-gray-600 text-sm">Engagement</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#1814F3] mr-2"></div>
              <span className="text-gray-600 text-sm">Time</span>
            </div>
          </div>

          <div className="relative h-48">
            <div className="absolute left-8 right-0 top-0 h-full">
              {[0, 1, 2, 3, 4, 5].map((line) => (
                <div 
                  key={line} 
                  className="absolute w-full" 
                  style={{
                    height: "1px",
                    backgroundColor: "#F3F3F5",
                    top: `${line * 20}%`
                  }}
                ></div>
              ))}
            </div>

            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-500 text-xs">
              <span>500</span>
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>

        <div>
          <h3 className="text-red-500 font-bold mb-2">Recent Transaction</h3>
          <div className="bg-[#FFFFFFCC] bg-opacity-80 rounded-3xl p-4">
            <div className="flex flex-col space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                    {transaction.icon === "donation" && (
                      <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                    )}
                    {transaction.icon === "refill" && (
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"></path>
                      </svg>
                    )}
                    {transaction.icon === "gained" && (
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{transaction.title}</p>
                    <p className="text-gray-500 text-sm">{transaction.date}</p>
                  </div>
                  <div className={`text-${transaction.color === 'green' ? 'green' : 'red'}-500 font-medium`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-red-500 font-bold mb-2">Upcoming Events</h3>
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="bg-[#FFFFFFCC] bg-opacity-80 rounded-3xl p-4">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
              </div>
              <div className="col-span-3">
                <h4 className="font-medium text-gray-800">Volunteer Opportunity</h4>
                <p className="text-gray-500 text-sm">{event.facility}</p>
              </div>
              <div className="col-span-2">
                <h4 className="font-medium text-gray-800">Date</h4>
                <p className="text-gray-500 text-sm">{event.date}</p>
                <p className="text-gray-500 text-sm">{event.frequency}</p>
              </div>
              <div className="col-span-3">
                <h4 className="font-medium text-gray-800">Address</h4>
                <p className="text-gray-500 text-sm">{event.address}</p>
              </div>
              <div className="col-span-2">
                <h4 className="font-medium text-gray-800">Recruitment</h4>
                <p className="text-gray-500 text-sm">{event.spots}</p>
              </div>
              <div>
                <button className="text-blue-500 rounded-lg hover:underline hover:cursor-pointer text-sm">
                  View Details
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;