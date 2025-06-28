// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/manage/ManageDashboard.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';

// interface Quest {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   type: string;
//   difficulty: string;
//   attribute: string;
//   xpReward: number;
//   coinReward: number;
//   attributeBoost: number;
//   timeLimit?: number;
//   questions?: any;
//   minLevel: number;
//   isActive: boolean;
//   _count: {
//     completions: number;
//   };
// }

// interface ShopItem {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   type: string;
//   price: number;
//   attributeBoosts?: any;
//   coinBonus?: number;
//   xpBonus?: number;
//   isActive: boolean;
//   isLimited: boolean;
//   stock?: number;
//   _count: {
//     purchases: number;
//   };
// }

// export default function ManageDashboard() {
//   const [activeTab, setActiveTab] = useState<'quests' | 'shop' | 'achievements'>('quests');
//   const [quests, setQuests] = useState<Quest[]>([]);
//   const [shopItems, setShopItems] = useState<ShopItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState<Quest | ShopItem | null>(null);

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === 'quests') {
//         const response = await fetch('/api/admin/manage/quests');
//         const data = await response.json();
//         setQuests(data.quests || []);
//       } else if (activeTab === 'shop') {
//         const response = await fetch('/api/admin/manage/shop');
//         const data = await response.json();
//         setShopItems(data.items || []);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setEditingItem(null);
//     setShowModal(true);
//   };

//   const handleEdit = (item: Quest | ShopItem) => {
//     setEditingItem(item);
//     setShowModal(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this item?')) return;

//     try {
//       const endpoint = activeTab === 'quests' 
//         ? `/api/admin/manage/quests/${id}`
//         : `/api/admin/manage/shop/${id}`;
      
//       const response = await fetch(endpoint, { method: 'DELETE' });
      
//       if (response.ok) {
//         fetchData();
//       } else {
//         alert('Failed to delete item');
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       alert('Error deleting item');
//     }
//   };

//   const handleSave = async (formData: any) => {
//     try {
//       const isEditing = editingItem !== null;
//       const endpoint = activeTab === 'quests' 
//         ? isEditing 
//           ? `/api/admin/manage/quests/${editingItem.id}`
//           : '/api/admin/manage/quests'
//         : isEditing
//           ? `/api/admin/manage/shop/${editingItem.id}`
//           : '/api/admin/manage/shop';

//       const response = await fetch(endpoint, {
//         method: isEditing ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setShowModal(false);
//         setEditingItem(null);
//         fetchData();
//       } else {
//         alert('Failed to save item');
//       }
//     } catch (error) {
//       console.error('Error saving item:', error);
//       alert('Error saving item');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-white">Manage Student Content</h1>
//         <button
//           onClick={handleAddNew}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
//         >
//           Add New {activeTab === 'quests' ? 'Quest' : 'Item'}
//         </button>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex space-x-4 border-b border-gray-700">
//         {(['quests', 'shop', 'achievements'] as const).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`py-2 px-4 font-medium capitalize ${
//               activeTab === tab
//                 ? 'text-red-500 border-b-2 border-red-500'
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
//         </div>
//       ) : (
//         <div>
//           {activeTab === 'quests' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {quests.map((quest) => (
//                 <div key={quest.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{quest.icon}</span>
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
//                         <span className="text-sm text-gray-400 capitalize">{quest.type}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(quest)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(quest.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4">{quest.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-400">XP Reward:</span>
//                       <span className="text-white ml-2">{quest.xpReward}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Coins:</span>
//                       <span className="text-white ml-2">{quest.coinReward}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Attribute:</span>
//                       <span className="text-white ml-2 capitalize">{quest.attribute}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Completions:</span>
//                       <span className="text-white ml-2">{quest._count.completions}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className={`px-3 py-1 rounded-full text-xs ${
//                       quest.isActive 
//                         ? 'bg-green-600 text-green-100' 
//                         : 'bg-red-600 text-red-100'
//                     }`}>
//                       {quest.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     <span className="text-xs text-gray-400 capitalize">
//                       {quest.difficulty}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'shop' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {shopItems.map((item) => (
//                 <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{item.icon}</span>
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">{item.name}</h3>
//                         <span className="text-sm text-gray-400 capitalize">{item.type}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-400">Price:</span>
//                       <span className="text-white ml-2">{item.price} coins</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Sales:</span>
//                       <span className="text-white ml-2">{item._count.purchases}</span>
//                     </div>
//                     {item.isLimited && (
//                       <div>
//                         <span className="text-gray-400">Stock:</span>
//                         <span className="text-white ml-2">{item.stock || 'Unlimited'}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className={`px-3 py-1 rounded-full text-xs ${
//                       item.isActive 
//                         ? 'bg-green-600 text-green-100' 
//                         : 'bg-red-600 text-red-100'
//                     }`}>
//                       {item.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     {item.isLimited && (
//                       <span className="text-xs text-yellow-400">
//                         Limited
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'achievements' && (
//             <div className="text-center py-12">
//               <p className="text-gray-400">Achievement management coming soon...</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal for Add/Edit would go here */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-white mb-6">
//               {editingItem ? 'Edit' : 'Add New'} {activeTab === 'quests' ? 'Quest' : 'Item'}
//             </h2>
            
//             {/* Form content would go here */}
//             <div className="space-y-4">
//               <p className="text-gray-300">
//                 Detailed form implementation for {activeTab} would go here.
//                 This would include all the necessary fields for creating/editing quests and shop items.
//               </p>
//             </div>

//             <div className="flex justify-end space-x-4 mt-8">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleSave({})}
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/manage/ManageDashboard.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';

// interface Quest {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   type: string;
//   difficulty: string;
//   attribute: string;
//   xpReward: number;
//   coinReward: number;
//   attributeBoost: number;
//   timeLimit?: number;
//   questions?: any;
//   minLevel: number;
//   isActive: boolean;
//   _count: {
//     completions: number;
//   };
// }

// interface ShopItem {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   type: string;
//   price: number;
//   attributeBoosts?: any;
//   coinBonus?: number;
//   xpBonus?: number;
//   isActive: boolean;
//   isLimited: boolean;
//   stock?: number;
//   _count: {
//     purchases: number;
//   };
// }

// // Form data interfaces
// interface QuestFormData {
//   title: string;
//   description: string;
//   icon: string;
//   type: string;
//   difficulty: string;
//   attribute: string;
//   xpReward: number;
//   coinReward: number;
//   attributeBoost: number;
//   timeLimit?: number;
//   minLevel: number;
//   isActive: boolean;
//   questions?: any[];
// }

// interface ShopItemFormData {
//   name: string;
//   description: string;
//   icon: string;
//   type: string;
//   price: number;
//   attributeBoosts?: any;
//   coinBonus?: number;
//   xpBonus?: number;
//   isActive: boolean;
//   isLimited: boolean;
//   stock?: number;
// }

// export default function ManageDashboard() {
//   const [activeTab, setActiveTab] = useState<'quests' | 'shop' | 'achievements'>('quests');
//   const [quests, setQuests] = useState<Quest[]>([]);
//   const [shopItems, setShopItems] = useState<ShopItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState<Quest | ShopItem | null>(null);

//   // Form states
//   const [questForm, setQuestForm] = useState<QuestFormData>({
//     title: '',
//     description: '',
//     icon: '🎯',
//     type: 'LOGIC',
//     difficulty: 'EASY',
//     attribute: 'character',
//     xpReward: 100,
//     coinReward: 50,
//     attributeBoost: 5,
//     timeLimit: 20,
//     minLevel: 1,
//     isActive: true,
//     questions: []
//   });

//   const [shopForm, setShopForm] = useState<ShopItemFormData>({
//     name: '',
//     description: '',
//     icon: '🎁',
//     type: 'BOOST',
//     price: 100,
//     isActive: true,
//     isLimited: false
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   useEffect(() => {
//     if (showModal && editingItem) {
//       if (activeTab === 'quests') {
//         const quest = editingItem as Quest;
//         setQuestForm({
//           title: quest.title,
//           description: quest.description,
//           icon: quest.icon,
//           type: quest.type,
//           difficulty: quest.difficulty,
//           attribute: quest.attribute,
//           xpReward: quest.xpReward,
//           coinReward: quest.coinReward,
//           attributeBoost: quest.attributeBoost,
//           timeLimit: quest.timeLimit,
//           minLevel: quest.minLevel,
//           isActive: quest.isActive,
//           questions: quest.questions || []
//         });
//       } else {
//         const item = editingItem as ShopItem;
//         setShopForm({
//           name: item.name,
//           description: item.description,
//           icon: item.icon,
//           type: item.type,
//           price: item.price,
//           attributeBoosts: item.attributeBoosts,
//           coinBonus: item.coinBonus,
//           xpBonus: item.xpBonus,
//           isActive: item.isActive,
//           isLimited: item.isLimited,
//           stock: item.stock
//         });
//       }
//     }
//   }, [showModal, editingItem, activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === 'quests') {
//         const response = await fetch('/api/admin/manage/quests');
//         const data = await response.json();
//         setQuests(data.quests || []);
//       } else if (activeTab === 'shop') {
//         const response = await fetch('/api/admin/manage/shop');
//         const data = await response.json();
//         setShopItems(data.items || []);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setEditingItem(null);
//     // Reset forms
//     if (activeTab === 'quests') {
//       setQuestForm({
//         title: '',
//         description: '',
//         icon: '🎯',
//         type: 'LOGIC',
//         difficulty: 'EASY',
//         attribute: 'character',
//         xpReward: 100,
//         coinReward: 50,
//         attributeBoost: 5,
//         timeLimit: 20,
//         minLevel: 1,
//         isActive: true,
//         questions: []
//       });
//     } else {
//       setShopForm({
//         name: '',
//         description: '',
//         icon: '🎁',
//         type: 'BOOST',
//         price: 100,
//         isActive: true,
//         isLimited: false
//       });
//     }
//     setShowModal(true);
//   };

//   const handleEdit = (item: Quest | ShopItem) => {
//     setEditingItem(item);
//     setShowModal(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this item?')) return;

//     try {
//       const endpoint = activeTab === 'quests' 
//         ? `/api/admin/manage/quests/${id}`
//         : `/api/admin/manage/shop/${id}`;
      
//       const response = await fetch(endpoint, { method: 'DELETE' });
      
//       if (response.ok) {
//         fetchData();
//       } else {
//         alert('Failed to delete item');
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       alert('Error deleting item');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const isEditing = editingItem !== null;
//       const formData = activeTab === 'quests' ? questForm : shopForm;
      
//       const endpoint = activeTab === 'quests' 
//         ? isEditing 
//           ? `/api/admin/manage/quests/${(editingItem as Quest)?.id}`
//           : '/api/admin/manage/quests'
//         : isEditing
//           ? `/api/admin/manage/shop/${(editingItem as ShopItem)?.id}`
//           : '/api/admin/manage/shop';

//       const response = await fetch(endpoint, {
//         method: isEditing ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setShowModal(false);
//         setEditingItem(null);
//         fetchData();
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to save item: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error saving item:', error);
//       alert('Error saving item');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-white">Manage Student Content</h1>
//         <button
//           onClick={handleAddNew}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
//         >
//           Add New {activeTab === 'quests' ? 'Quest' : 'Item'}
//         </button>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex space-x-4 border-b border-gray-700">
//         {(['quests', 'shop', 'achievements'] as const).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`py-2 px-4 font-medium capitalize ${
//               activeTab === tab
//                 ? 'text-red-500 border-b-2 border-red-500'
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
//         </div>
//       ) : (
//         <div>
//           {activeTab === 'quests' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {quests.map((quest) => (
//                 <div key={quest.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{quest.icon}</span>
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
//                         <span className="text-sm text-gray-400 capitalize">{quest.type}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(quest)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(quest.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4">{quest.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-400">XP Reward:</span>
//                       <span className="text-white ml-2">{quest.xpReward}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Coins:</span>
//                       <span className="text-white ml-2">{quest.coinReward}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Attribute:</span>
//                       <span className="text-white ml-2 capitalize">{quest.attribute}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Completions:</span>
//                       <span className="text-white ml-2">{quest._count.completions}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className={`px-3 py-1 rounded-full text-xs ${
//                       quest.isActive 
//                         ? 'bg-green-600 text-green-100' 
//                         : 'bg-red-600 text-red-100'
//                     }`}>
//                       {quest.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     <span className="text-xs text-gray-400 capitalize">
//                       {quest.difficulty}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'shop' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {shopItems.map((item) => (
//                 <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{item.icon}</span>
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">{item.name}</h3>
//                         <span className="text-sm text-gray-400 capitalize">{item.type}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-400">Price:</span>
//                       <span className="text-white ml-2">{item.price} coins</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Sales:</span>
//                       <span className="text-white ml-2">{item._count.purchases}</span>
//                     </div>
//                     {item.isLimited && (
//                       <div>
//                         <span className="text-gray-400">Stock:</span>
//                         <span className="text-white ml-2">{item.stock || 'Unlimited'}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className={`px-3 py-1 rounded-full text-xs ${
//                       item.isActive 
//                         ? 'bg-green-600 text-green-100' 
//                         : 'bg-red-600 text-red-100'
//                     }`}>
//                       {item.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     {item.isLimited && (
//                       <span className="text-xs text-yellow-400">
//                         Limited
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'achievements' && (
//             <div className="text-center py-12">
//               <p className="text-gray-400">Achievement management coming soon...</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal for Add/Edit */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-white mb-6">
//               {editingItem ? 'Edit' : 'Add New'} {activeTab === 'quests' ? 'Quest' : 'Shop Item'}
//             </h2>
            
//             {/* Quest Form */}
//             {activeTab === 'quests' && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
//                     <input
//                       type="text"
//                       value={questForm.title}
//                       onChange={(e) => setQuestForm({...questForm, title: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="Quest title"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
//                     <input
//                       type="text"
//                       value={questForm.icon}
//                       onChange={(e) => setQuestForm({...questForm, icon: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="🎯"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                   <textarea
//                     value={questForm.description}
//                     onChange={(e) => setQuestForm({...questForm, description: e.target.value})}
//                     rows={3}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     placeholder="Quest description"
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
//                     <select
//                       value={questForm.type}
//                       onChange={(e) => setQuestForm({...questForm, type: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="LOGIC">Logic</option>
//                       <option value="MATH">Math</option>
//                       <option value="HEALTH">Health</option>
//                       <option value="SCHOLAR">Scholar</option>
//                       <option value="EXPLORATION">Exploration</option>
//                       <option value="STEWARDSHIP">Stewardship</option>
//                       <option value="EVENT">Event</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
//                     <select
//                       value={questForm.difficulty}
//                       onChange={(e) => setQuestForm({...questForm, difficulty: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="EASY">Easy</option>
//                       <option value="MEDIUM">Medium</option>
//                       <option value="HARD">Hard</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Attribute</label>
//                     <select
//                       value={questForm.attribute}
//                       onChange={(e) => setQuestForm({...questForm, attribute: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="character">Character</option>
//                       <option value="health">Health</option>
//                       <option value="exploration">Exploration</option>
//                       <option value="scholarship">Scholarship</option>
//                       <option value="stewardship">Stewardship</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">XP Reward</label>
//                     <input
//                       type="number"
//                       value={questForm.xpReward}
//                       onChange={(e) => setQuestForm({...questForm, xpReward: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Coin Reward</label>
//                     <input
//                       type="number"
//                       value={questForm.coinReward}
//                       onChange={(e) => setQuestForm({...questForm, coinReward: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Attribute Boost</label>
//                     <input
//                       type="number"
//                       value={questForm.attributeBoost}
//                       onChange={(e) => setQuestForm({...questForm, attributeBoost: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Min Level</label>
//                     <input
//                       type="number"
//                       value={questForm.minLevel}
//                       onChange={(e) => setQuestForm({...questForm, minLevel: parseInt(e.target.value) || 1})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (seconds)</label>
//                     <input
//                       type="number"
//                       value={questForm.timeLimit || ''}
//                       onChange={(e) => setQuestForm({...questForm, timeLimit: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="20"
//                     />
//                   </div>
//                   <div className="flex items-center">
//                     <label className="flex items-center text-white">
//                       <input
//                         type="checkbox"
//                         checked={questForm.isActive}
//                         onChange={(e) => setQuestForm({...questForm, isActive: e.target.checked})}
//                         className="mr-2"
//                       />
//                       Active
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Shop Item Form */}
//             {activeTab === 'shop' && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
//                     <input
//                       type="text"
//                       value={shopForm.name}
//                       onChange={(e) => setShopForm({...shopForm, name: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="Item name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
//                     <input
//                       type="text"
//                       value={shopForm.icon}
//                       onChange={(e) => setShopForm({...shopForm, icon: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="🎁"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                   <textarea
//                     value={shopForm.description}
//                     onChange={(e) => setShopForm({...shopForm, description: e.target.value})}
//                     rows={3}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     placeholder="Item description"
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
//                     <select
//                       value={shopForm.type}
//                       onChange={(e) => setShopForm({...shopForm, type: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="AVATAR">Avatar</option>
//                       <option value="SKIN">Skin</option>
//                       <option value="BOOST">Boost</option>
//                       <option value="CREDITS">Credits</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
//                     <input
//                       type="number"
//                       value={shopForm.price}
//                       onChange={(e) => setShopForm({...shopForm, price: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Stock (optional)</label>
//                     <input
//                       type="number"
//                       value={shopForm.stock || ''}
//                       onChange={(e) => setShopForm({...shopForm, stock: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="Unlimited"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Coin Bonus (optional)</label>
//                     <input
//                       type="number"
//                       value={shopForm.coinBonus || ''}
//                       onChange={(e) => setShopForm({...shopForm, coinBonus: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">XP Bonus (optional)</label>
//                     <input
//                       type="number"
//                       value={shopForm.xpBonus || ''}
//                       onChange={(e) => setShopForm({...shopForm, xpBonus: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <label className="flex items-center text-white">
//                     <input
//                       type="checkbox"
//                       checked={shopForm.isActive}
//                       onChange={(e) => setShopForm({...shopForm, isActive: e.target.checked})}
//                       className="mr-2"
//                     />
//                     Active
//                   </label>
//                   <label className="flex items-center text-white">
//                     <input
//                       type="checkbox"
//                       checked={shopForm.isLimited}
//                       onChange={(e) => setShopForm({...shopForm, isLimited: e.target.checked})}
//                       className="mr-2"
//                     />
//                     Limited Stock
//                   </label>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end space-x-4 mt-8">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




















// /* eslint-disable @typescript-eslint/no-explicit-any */
// // components/manage/ManageDashboard.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';

// interface Quest {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   type: string;
//   difficulty: string;
//   attribute: string;
//   xpReward: number;
//   coinReward: number;
//   attributeBoost: number;
//   timeLimit?: number;
//   questions?: any;
//   minLevel: number;
//   isActive: boolean;
//   _count: {
//     completions: number;
//   };
// }

// interface ShopItem {
//   id: string;
//   name: string;
//   description: string;
//   icon: string;
//   type: string;
//   price: number;
//   attributeBoosts?: any;
//   coinBonus?: number;
//   xpBonus?: number;
//   isActive: boolean;
//   isLimited: boolean;
//   stock?: number;
//   _count: {
//     purchases: number;
//   };
// }

// interface Question {
//   q: string;
//   o: string[];
//   a: number;
// }

// // Form data interfaces
// interface QuestFormData {
//   title: string;
//   description: string;
//   icon: string;
//   type: string;
//   difficulty: string;
//   attribute: string;
//   xpReward: number;
//   coinReward: number;
//   attributeBoost: number;
//   timeLimit?: number;
//   minLevel: number;
//   isActive: boolean;
//   questions?: Question[];
// }

// interface ShopItemFormData {
//   name: string;
//   description: string;
//   icon: string;
//   type: string;
//   price: number;
//   attributeBoosts?: any;
//   coinBonus?: number;
//   xpBonus?: number;
//   isActive: boolean;
//   isLimited: boolean;
//   stock?: number;
// }

// export default function ManageDashboard() {
//   const [activeTab, setActiveTab] = useState<'quests' | 'shop' | 'achievements'>('quests');
//   const [quests, setQuests] = useState<Quest[]>([]);
//   const [shopItems, setShopItems] = useState<ShopItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState<Quest | ShopItem | null>(null);

//   // Form states
//   const [questForm, setQuestForm] = useState<QuestFormData>({
//     title: '',
//     description: '',
//     icon: '🎯',
//     type: 'LOGIC',
//     difficulty: 'EASY',
//     attribute: 'character',
//     xpReward: 100,
//     coinReward: 50,
//     attributeBoost: 5,
//     timeLimit: 20,
//     minLevel: 1,
//     isActive: true,
//     questions: []
//   });

//   const [shopForm, setShopForm] = useState<ShopItemFormData>({
//     name: '',
//     description: '',
//     icon: '🎁',
//     type: 'BOOST',
//     price: 100,
//     isActive: true,
//     isLimited: false
//   });

//   // Question editor states
//   const [currentQuestion, setCurrentQuestion] = useState<Question>({
//     q: '',
//     o: ['', '', '', ''],
//     a: 0
//   });

//   useEffect(() => {
//     fetchData();
//   }, [activeTab]);

//   useEffect(() => {
//     if (showModal && editingItem) {
//       if (activeTab === 'quests') {
//         const quest = editingItem as Quest;
//         setQuestForm({
//           title: quest.title,
//           description: quest.description,
//           icon: quest.icon,
//           type: quest.type,
//           difficulty: quest.difficulty,
//           attribute: quest.attribute,
//           xpReward: quest.xpReward,
//           coinReward: quest.coinReward,
//           attributeBoost: quest.attributeBoost,
//           timeLimit: quest.timeLimit,
//           minLevel: quest.minLevel,
//           isActive: quest.isActive,
//           questions: quest.questions || []
//         });
//       } else {
//         const item = editingItem as ShopItem;
//         setShopForm({
//           name: item.name,
//           description: item.description,
//           icon: item.icon,
//           type: item.type,
//           price: item.price,
//           attributeBoosts: item.attributeBoosts,
//           coinBonus: item.coinBonus,
//           xpBonus: item.xpBonus,
//           isActive: item.isActive,
//           isLimited: item.isLimited,
//           stock: item.stock
//         });
//       }
//     }
//   }, [showModal, editingItem, activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       if (activeTab === 'quests') {
//         const response = await fetch('/api/admin/manage/quests');
//         const data = await response.json();
//         setQuests(data.quests || []);
//       } else if (activeTab === 'shop') {
//         const response = await fetch('/api/admin/manage/shop');
//         const data = await response.json();
//         setShopItems(data.items || []);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setEditingItem(null);
//     // Reset forms
//     if (activeTab === 'quests') {
//       setQuestForm({
//         title: '',
//         description: '',
//         icon: '🎯',
//         type: 'LOGIC',
//         difficulty: 'EASY',
//         attribute: 'character',
//         xpReward: 100,
//         coinReward: 50,
//         attributeBoost: 5,
//         timeLimit: 20,
//         minLevel: 1,
//         isActive: true,
//         questions: []
//       });
//     } else {
//       setShopForm({
//         name: '',
//         description: '',
//         icon: '🎁',
//         type: 'BOOST',
//         price: 100,
//         isActive: true,
//         isLimited: false
//       });
//     }
//     setShowModal(true);
//   };

//   const handleEdit = (item: Quest | ShopItem) => {
//     setEditingItem(item);
//     setShowModal(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this item?')) return;

//     try {
//       const endpoint = activeTab === 'quests' 
//         ? `/api/admin/manage/quests/${id}`
//         : `/api/admin/manage/shop/${id}`;
      
//       const response = await fetch(endpoint, { method: 'DELETE' });
      
//       if (response.ok) {
//         fetchData();
//       } else {
//         alert('Failed to delete item');
//       }
//     } catch (error) {
//       console.error('Error deleting item:', error);
//       alert('Error deleting item');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const isEditing = editingItem !== null;
//       const formData = activeTab === 'quests' ? questForm : shopForm;
      
//       const endpoint = activeTab === 'quests' 
//         ? isEditing 
//           ? `/api/admin/manage/quests/${(editingItem as Quest)?.id}`
//           : '/api/admin/manage/quests'
//         : isEditing
//           ? `/api/admin/manage/shop/${(editingItem as ShopItem)?.id}`
//           : '/api/admin/manage/shop';

//       const response = await fetch(endpoint, {
//         method: isEditing ? 'PUT' : 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setShowModal(false);
//         setEditingItem(null);
//         fetchData();
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to save item: ${errorData.error || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error('Error saving item:', error);
//       alert('Error saving item');
//     }
//   };

//   const addQuestion = () => {
//     if (currentQuestion.q && currentQuestion.o.every(option => option.trim())) {
//       setQuestForm({
//         ...questForm,
//         questions: [...(questForm.questions || []), { ...currentQuestion }]
//       });
//       setCurrentQuestion({
//         q: '',
//         o: ['', '', '', ''],
//         a: 0
//       });
//     }
//   };

//   const removeQuestion = (index: number) => {
//     const newQuestions = [...(questForm.questions || [])];
//     newQuestions.splice(index, 1);
//     setQuestForm({
//       ...questForm,
//       questions: newQuestions
//     });
//   };

//   const updateAttributeBoosts = (attribute: string, value: number) => {
//     const currentBoosts = shopForm.attributeBoosts || {};
//     const newBoosts = { ...currentBoosts };
//     if (value > 0) {
//       newBoosts[attribute] = value;
//     } else {
//       delete newBoosts[attribute];
//     }
//     setShopForm({
//       ...shopForm,
//       attributeBoosts: Object.keys(newBoosts).length > 0 ? newBoosts : undefined
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-white">Manage Student Content</h1>
//         <button
//           onClick={handleAddNew}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
//         >
//           Add New {activeTab === 'quests' ? 'Quest' : 'Item'}
//         </button>
//       </div>

//       {/* Tab Navigation */}
//       <div className="flex space-x-4 border-b border-gray-700">
//         {(['quests', 'shop', 'achievements'] as const).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`py-2 px-4 font-medium capitalize ${
//               activeTab === tab
//                 ? 'text-red-500 border-b-2 border-red-500'
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
//         </div>
//       ) : (
//         <div>
//           {activeTab === 'quests' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {quests.map((quest) => (
//                 <div key={quest.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{quest.icon}</span>
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
//                         <span className="text-sm text-gray-400 capitalize">{quest.type}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(quest)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(quest.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4">{quest.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-400">XP Reward:</span>
//                       <span className="text-white ml-2">{quest.xpReward}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Coins:</span>
//                       <span className="text-white ml-2">{quest.coinReward}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Attribute:</span>
//                       <span className="text-white ml-2 capitalize">{quest.attribute}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Completions:</span>
//                       <span className="text-white ml-2">{quest._count.completions}</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Questions:</span>
//                       <span className="text-white ml-2">{quest.questions?.length || 0}</span>
//                     </div>
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className={`px-3 py-1 rounded-full text-xs ${
//                       quest.isActive 
//                         ? 'bg-green-600 text-green-100' 
//                         : 'bg-red-600 text-red-100'
//                     }`}>
//                       {quest.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     <span className="text-xs text-gray-400 capitalize">
//                       {quest.difficulty}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'shop' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {shopItems.map((item) => (
//                 <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center space-x-3">
//                       <span className="text-2xl">{item.icon}</span>
//                       <div>
//                         <h3 className="text-lg font-semibold text-white">{item.name}</h3>
//                         <span className="text-sm text-gray-400 capitalize">{item.type}</span>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="text-blue-400 hover:text-blue-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(item.id)}
//                         className="text-red-400 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
                  
//                   <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-400">Price:</span>
//                       <span className="text-white ml-2">{item.price} coins</span>
//                     </div>
//                     <div>
//                       <span className="text-gray-400">Sales:</span>
//                       <span className="text-white ml-2">{item._count.purchases}</span>
//                     </div>
//                     {item.isLimited && (
//                       <div>
//                         <span className="text-gray-400">Stock:</span>
//                         <span className="text-white ml-2">{item.stock || 'Unlimited'}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="mt-4 flex justify-between items-center">
//                     <span className={`px-3 py-1 rounded-full text-xs ${
//                       item.isActive 
//                         ? 'bg-green-600 text-green-100' 
//                         : 'bg-red-600 text-red-100'
//                     }`}>
//                       {item.isActive ? 'Active' : 'Inactive'}
//                     </span>
//                     {item.isLimited && (
//                       <span className="text-xs text-yellow-400">
//                         Limited
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeTab === 'achievements' && (
//             <div className="text-center py-12">
//               <p className="text-gray-400">Achievement management coming soon...</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal for Add/Edit */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-white mb-6">
//               {editingItem ? 'Edit' : 'Add New'} {activeTab === 'quests' ? 'Quest' : 'Shop Item'}
//             </h2>
            
//             {/* Quest Form */}
//             {activeTab === 'quests' && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
//                     <input
//                       type="text"
//                       value={questForm.title}
//                       onChange={(e) => setQuestForm({...questForm, title: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="Quest title"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
//                     <input
//                       type="text"
//                       value={questForm.icon}
//                       onChange={(e) => setQuestForm({...questForm, icon: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="🎯"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                   <textarea
//                     value={questForm.description}
//                     onChange={(e) => setQuestForm({...questForm, description: e.target.value})}
//                     rows={3}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     placeholder="Quest description"
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
//                     <select
//                       value={questForm.type}
//                       onChange={(e) => setQuestForm({...questForm, type: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="LOGIC">Logic</option>
//                       <option value="MATH">Math</option>
//                       <option value="HEALTH">Health</option>
//                       <option value="SCHOLAR">Scholar</option>
//                       <option value="EXPLORATION">Exploration</option>
//                       <option value="STEWARDSHIP">Stewardship</option>
//                       <option value="EVENT">Event</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
//                     <select
//                       value={questForm.difficulty}
//                       onChange={(e) => setQuestForm({...questForm, difficulty: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="EASY">Easy</option>
//                       <option value="MEDIUM">Medium</option>
//                       <option value="HARD">Hard</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Attribute</label>
//                     <select
//                       value={questForm.attribute}
//                       onChange={(e) => setQuestForm({...questForm, attribute: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="character">Character</option>
//                       <option value="health">Health</option>
//                       <option value="exploration">Exploration</option>
//                       <option value="scholarship">Scholarship</option>
//                       <option value="stewardship">Stewardship</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-4 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">XP Reward</label>
//                     <input
//                       type="number"
//                       value={questForm.xpReward}
//                       onChange={(e) => setQuestForm({...questForm, xpReward: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Coin Reward</label>
//                     <input
//                       type="number"
//                       value={questForm.coinReward}
//                       onChange={(e) => setQuestForm({...questForm, coinReward: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Attribute Boost</label>
//                     <input
//                       type="number"
//                       value={questForm.attributeBoost}
//                       onChange={(e) => setQuestForm({...questForm, attributeBoost: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Min Level</label>
//                     <input
//                       type="number"
//                       value={questForm.minLevel}
//                       onChange={(e) => setQuestForm({...questForm, minLevel: parseInt(e.target.value) || 1})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (seconds)</label>
//                     <input
//                       type="number"
//                       value={questForm.timeLimit || ''}
//                       onChange={(e) => setQuestForm({...questForm, timeLimit: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="20"
//                     />
//                   </div>
//                   <div className="flex items-center">
//                     <label className="flex items-center text-white">
//                       <input
//                         type="checkbox"
//                         checked={questForm.isActive}
//                         onChange={(e) => setQuestForm({...questForm, isActive: e.target.checked})}
//                         className="mr-2"
//                       />
//                       Active
//                     </label>
//                   </div>
//                 </div>

//                 {/* Question Editor */}
//                 <div className="border-t border-gray-600 pt-4">
//                   <h3 className="text-lg font-semibold text-white mb-4">Questions</h3>
                  
//                   {/* Current Questions */}
//                   {questForm.questions && questForm.questions.length > 0 && (
//                     <div className="mb-4">
//                       <h4 className="text-md font-medium text-gray-300 mb-2">Current Questions ({questForm.questions.length})</h4>
//                       <div className="space-y-2 max-h-40 overflow-y-auto">
//                         {questForm.questions.map((q, index) => (
//                           <div key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-start">
//                             <div className="flex-1">
//                               <div className="font-medium text-white">{q.q}</div>
//                               <div className="text-sm text-gray-300">
//                                 Correct: {q.o[q.a]}
//                               </div>
//                             </div>
//                             <button
//                               onClick={() => removeQuestion(index)}
//                               className="text-red-400 hover:text-red-300 ml-2"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Add New Question */}
//                   <div className="bg-gray-700 p-4 rounded-md">
//                     <h4 className="text-md font-medium text-gray-300 mb-3">Add New Question</h4>
//                     <div className="space-y-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1">Question</label>
//                         <input
//                           type="text"
//                           value={currentQuestion.q}
//                           onChange={(e) => setCurrentQuestion({...currentQuestion, q: e.target.value})}
//                           className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
//                           placeholder="Enter your question"
//                         />
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1">Options</label>
//                         <div className="grid grid-cols-2 gap-2">
//                           {currentQuestion.o.map((option, index) => (
//                             <div key={index} className="flex items-center space-x-2">
//                               <input
//                                 type="radio"
//                                 name="correctAnswer"
//                                 checked={currentQuestion.a === index}
//                                 onChange={() => setCurrentQuestion({...currentQuestion, a: index})}
//                                 className="text-red-500"
//                               />
//                               <input
//                                 type="text"
//                                 value={option}
//                                 onChange={(e) => {
//                                   const newOptions = [...currentQuestion.o];
//                                   newOptions[index] = e.target.value;
//                                   setCurrentQuestion({...currentQuestion, o: newOptions});
//                                 }}
//                                 className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white"
//                                 placeholder={`Option ${index + 1}`}
//                               />
//                             </div>
//                           ))}
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           Select the radio button next to the correct answer
//                         </div>
//                       </div>
                      
//                       <button
//                         onClick={addQuestion}
//                         disabled={!currentQuestion.q || !currentQuestion.o.every(o => o.trim())}
//                         className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md"
//                       >
//                         Add Question
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Shop Item Form */}
//             {activeTab === 'shop' && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
//                     <input
//                       type="text"
//                       value={shopForm.name}
//                       onChange={(e) => setShopForm({...shopForm, name: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="Item name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
//                     <input
//                       type="text"
//                       value={shopForm.icon}
//                       onChange={(e) => setShopForm({...shopForm, icon: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="🎁"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
//                   <textarea
//                     value={shopForm.description}
//                     onChange={(e) => setShopForm({...shopForm, description: e.target.value})}
//                     rows={3}
//                     className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     placeholder="Item description"
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
//                     <select
//                       value={shopForm.type}
//                       onChange={(e) => setShopForm({...shopForm, type: e.target.value})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     >
//                       <option value="AVATAR">Avatar</option>
//                       <option value="SKIN">Skin</option>
//                       <option value="BOOST">Boost</option>
//                       <option value="CREDITS">Credits</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
//                     <input
//                       type="number"
//                       value={shopForm.price}
//                       onChange={(e) => setShopForm({...shopForm, price: parseInt(e.target.value) || 0})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Stock (optional)</label>
//                     <input
//                       type="number"
//                       value={shopForm.stock || ''}
//                       onChange={(e) => setShopForm({...shopForm, stock: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                       placeholder="Unlimited"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Coin Bonus (optional)</label>
//                     <input
//                       type="number"
//                       value={shopForm.coinBonus || ''}
//                       onChange={(e) => setShopForm({...shopForm, coinBonus: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">XP Bonus (optional)</label>
//                     <input
//                       type="number"
//                       value={shopForm.xpBonus || ''}
//                       onChange={(e) => setShopForm({...shopForm, xpBonus: parseInt(e.target.value) || undefined})}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
//                     />
//                   </div>
//                 </div>

//                 {/* Attribute Boosts */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300 mb-2">Attribute Boosts (optional)</label>
//                   <div className="grid grid-cols-5 gap-2">
//                     {['character', 'health', 'exploration', 'scholarship', 'stewardship'].map(attr => (
//                       <div key={attr}>
//                         <label className="block text-xs text-gray-400 mb-1 capitalize">{attr}</label>
//                         <input
//                           type="number"
//                           min="0"
//                           max="20"
//                           value={shopForm.attributeBoosts?.[attr] || ''}
//                           onChange={(e) => updateAttributeBoosts(attr, parseInt(e.target.value) || 0)}
//                           className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
//                           placeholder="0"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <label className="flex items-center text-white">
//                     <input
//                       type="checkbox"
//                       checked={shopForm.isActive}
//                       onChange={(e) => setShopForm({...shopForm, isActive: e.target.checked})}
//                       className="mr-2"
//                     />
//                     Active
//                   </label>
//                   <label className="flex items-center text-white">
//                     <input
//                       type="checkbox"
//                       checked={shopForm.isLimited}
//                       onChange={(e) => setShopForm({...shopForm, isLimited: e.target.checked})}
//                       className="mr-2"
//                     />
//                     Limited Stock
//                   </label>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-end space-x-4 mt-8">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// 28 june 2025

/* eslint-disable @typescript-eslint/no-explicit-any */
// components/manage/ManageDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  difficulty: string;
  attribute: string;
  xpReward: number;
  coinReward: number;
  attributeBoost: number;
  timeLimit?: number;
  questions?: any;
  minLevel: number;
  isActive: boolean;
  _count: {
    completions: number;
  };
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
  price: number;
  attributeBoosts?: any;
  coinBonus?: number;
  xpBonus?: number;
  isActive: boolean;
  isLimited: boolean;
  stock?: number;
  _count: {
    purchases: number;
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredXp?: number;
  requiredLevel?: number;
  requiredQuests: string[];
  requiredAttribute?: string;
  xpReward: number;
  coinReward: number;
  isActive: boolean;
  _count: {
    studentAchievements: number;
  };
}

interface Question {
  q: string;
  o: string[];
  a: number;
}

// Form data interfaces
interface QuestFormData {
  title: string;
  description: string;
  icon: string;
  type: string;
  difficulty: string;
  attribute: string;
  xpReward: number;
  coinReward: number;
  attributeBoost: number;
  timeLimit?: number;
  minLevel: number;
  isActive: boolean;
  questions?: Question[];
}

interface ShopItemFormData {
  name: string;
  description: string;
  icon: string;
  type: string;
  price: number;
  attributeBoosts?: any;
  coinBonus?: number;
  xpBonus?: number;
  isActive: boolean;
  isLimited: boolean;
  stock?: number;
}

interface AchievementFormData {
  name: string;
  description: string;
  icon: string;
  requiredXp?: number;
  requiredLevel?: number;
  requiredQuests: string[];
  requiredAttribute?: string;
  xpReward: number;
  coinReward: number;
  isActive: boolean;
}

export default function ManageDashboard() {
  const [activeTab, setActiveTab] = useState<'quests' | 'shop' | 'achievements'>('quests');
  const [quests, setQuests] = useState<Quest[]>([]);
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Quest | ShopItem | Achievement | null>(null);

  // Form states
  const [questForm, setQuestForm] = useState<QuestFormData>({
    title: '',
    description: '',
    icon: '🎯',
    type: 'LOGIC',
    difficulty: 'EASY',
    attribute: 'character',
    xpReward: 100,
    coinReward: 50,
    attributeBoost: 5,
    timeLimit: 20,
    minLevel: 1,
    isActive: true,
    questions: []
  });

  const [shopForm, setShopForm] = useState<ShopItemFormData>({
    name: '',
    description: '',
    icon: '🎁',
    type: 'BOOST',
    price: 100,
    isActive: true,
    isLimited: false
  });

  const [achievementForm, setAchievementForm] = useState<AchievementFormData>({
    name: '',
    description: '',
    icon: '🏆',
    requiredQuests: [],
    xpReward: 0,
    coinReward: 0,
    isActive: true
  });

  // Question editor states
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    q: '',
    o: ['', '', '', ''],
    a: 0
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (showModal && editingItem) {
      if (activeTab === 'quests') {
        const quest = editingItem as Quest;
        setQuestForm({
          title: quest.title,
          description: quest.description,
          icon: quest.icon,
          type: quest.type,
          difficulty: quest.difficulty,
          attribute: quest.attribute,
          xpReward: quest.xpReward,
          coinReward: quest.coinReward,
          attributeBoost: quest.attributeBoost,
          timeLimit: quest.timeLimit,
          minLevel: quest.minLevel,
          isActive: quest.isActive,
          questions: quest.questions || []
        });
      } else if (activeTab === 'shop') {
        const item = editingItem as ShopItem;
        setShopForm({
          name: item.name,
          description: item.description,
          icon: item.icon,
          type: item.type,
          price: item.price,
          attributeBoosts: item.attributeBoosts,
          coinBonus: item.coinBonus,
          xpBonus: item.xpBonus,
          isActive: item.isActive,
          isLimited: item.isLimited,
          stock: item.stock
        });
      } else {
        const achievement = editingItem as Achievement;
        setAchievementForm({
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          requiredXp: achievement.requiredXp,
          requiredLevel: achievement.requiredLevel,
          requiredQuests: achievement.requiredQuests,
          requiredAttribute: achievement.requiredAttribute,
          xpReward: achievement.xpReward,
          coinReward: achievement.coinReward,
          isActive: achievement.isActive
        });
      }
    }
  }, [showModal, editingItem, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'quests') {
        const response = await fetch('/api/admin/manage/quests');
        const data = await response.json();
        setQuests(data.quests || []);
      } else if (activeTab === 'shop') {
        const response = await fetch('/api/admin/manage/shop');
        const data = await response.json();
        setShopItems(data.items || []);
      } else if (activeTab === 'achievements') {
        const response = await fetch('/api/admin/manage/achievements');
        const data = await response.json();
        setAchievements(data.achievements || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingItem(null);
    // Reset forms
    if (activeTab === 'quests') {
      setQuestForm({
        title: '',
        description: '',
        icon: '🎯',
        type: 'LOGIC',
        difficulty: 'EASY',
        attribute: 'character',
        xpReward: 100,
        coinReward: 50,
        attributeBoost: 5,
        timeLimit: 20,
        minLevel: 1,
        isActive: true,
        questions: []
      });
    } else if (activeTab === 'shop') {
      setShopForm({
        name: '',
        description: '',
        icon: '🎁',
        type: 'BOOST',
        price: 100,
        isActive: true,
        isLimited: false
      });
    } else {
      setAchievementForm({
        name: '',
        description: '',
        icon: '🏆',
        requiredQuests: [],
        xpReward: 0,
        coinReward: 0,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const handleEdit = (item: Quest | ShopItem | Achievement) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = activeTab === 'quests' 
        ? `/api/admin/manage/quests/${id}`
        : activeTab === 'shop'
        ? `/api/admin/manage/shop/${id}`
        : `/api/admin/manage/achievements/${id}`;
      
      const response = await fetch(endpoint, { method: 'DELETE' });
      
      if (response.ok) {
        fetchData();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete item: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  const handleSave = async () => {
    try {
      const isEditing = editingItem !== null;
      const formData = activeTab === 'quests' 
        ? questForm 
        : activeTab === 'shop'
        ? shopForm
        : achievementForm;
      
      const endpoint = activeTab === 'quests' 
        ? isEditing 
          ? `/api/admin/manage/quests/${(editingItem as Quest)?.id}`
          : '/api/admin/manage/quests'
        : activeTab === 'shop'
        ? isEditing
          ? `/api/admin/manage/shop/${(editingItem as ShopItem)?.id}`
          : '/api/admin/manage/shop'
        : isEditing
          ? `/api/admin/manage/achievements/${(editingItem as Achievement)?.id}`
          : '/api/admin/manage/achievements';

      const response = await fetch(endpoint, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingItem(null);
        fetchData();
      } else {
        const errorData = await response.json();
        alert(`Failed to save item: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    }
  };

  const addQuestion = () => {
    if (currentQuestion.q && currentQuestion.o.every(option => option.trim())) {
      setQuestForm({
        ...questForm,
        questions: [...(questForm.questions || []), { ...currentQuestion }]
      });
      setCurrentQuestion({
        q: '',
        o: ['', '', '', ''],
        a: 0
      });
    }
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...(questForm.questions || [])];
    newQuestions.splice(index, 1);
    setQuestForm({
      ...questForm,
      questions: newQuestions
    });
  };

  const updateAttributeBoosts = (attribute: string, value: number) => {
    const currentBoosts = shopForm.attributeBoosts || {};
    const newBoosts = { ...currentBoosts };
    if (value > 0) {
      newBoosts[attribute] = value;
    } else {
      delete newBoosts[attribute];
    }
    setShopForm({
      ...shopForm,
      attributeBoosts: Object.keys(newBoosts).length > 0 ? newBoosts : undefined
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Student Content</h1>
        <button
          onClick={handleAddNew}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add New {activeTab === 'quests' ? 'Quest' : activeTab === 'shop' ? 'Item' : 'Achievement'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-700">
        {(['quests', 'shop', 'achievements'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium capitalize ${
              activeTab === tab
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <div>
          {activeTab === 'quests' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quests.map((quest) => (
                <div key={quest.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{quest.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                        <span className="text-sm text-gray-400 capitalize">{quest.type}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(quest)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(quest.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{quest.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">XP Reward:</span>
                      <span className="text-white ml-2">{quest.xpReward}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Coins:</span>
                      <span className="text-white ml-2">{quest.coinReward}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Attribute:</span>
                      <span className="text-white ml-2 capitalize">{quest.attribute}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Completions:</span>
                      <span className="text-white ml-2">{quest._count.completions}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Questions:</span>
                      <span className="text-white ml-2">{quest.questions?.length || 0}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      quest.isActive 
                        ? 'bg-green-600 text-green-100' 
                        : 'bg-red-600 text-red-100'
                    }`}>
                      {quest.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <span className="text-sm text-gray-400 capitalize">{item.type}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Price:</span>
                      <span className="text-white ml-2">{item.price} coins</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sales:</span>
                      <span className="text-white ml-2">{item._count.purchases}</span>
                    </div>
                    {item.isLimited && (
                      <div>
                        <span className="text-gray-400">Stock:</span>
                        <span className="text-white ml-2">{item.stock || 'Unlimited'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      item.isActive 
                        ? 'bg-green-600 text-green-100' 
                        : 'bg-red-600 text-red-100'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {item.isLimited && (
                      <span className="text-xs text-yellow-400">
                        Limited
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{achievement.name}</h3>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(achievement)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(achievement.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{achievement.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">XP Reward:</span>
                      <span className="text-white ml-2">{achievement.xpReward}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Coins:</span>
                      <span className="text-white ml-2">{achievement.coinReward}</span>
                    </div>
                    {achievement.requiredLevel && (
                      <div>
                        <span className="text-gray-400">Required Level:</span>
                        <span className="text-white ml-2">{achievement.requiredLevel}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Unlocked:</span>
                      <span className="text-white ml-2">{achievement._count.studentAchievements}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      achievement.isActive 
                        ? 'bg-green-600 text-green-100' 
                        : 'bg-red-600 text-red-100'
                    }`}>
                      {achievement.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingItem ? 'Edit' : 'Add New'} {
                activeTab === 'quests' ? 'Quest' : 
                activeTab === 'shop' ? 'Shop Item' : 
                'Achievement'
              }
            </h2>
            
            {/* Quest Form */}
            {activeTab === 'quests' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      value={questForm.title}
                      onChange={(e) => setQuestForm({...questForm, title: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Quest title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                    <input
                      type="text"
                      value={questForm.icon}
                      onChange={(e) => setQuestForm({...questForm, icon: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="🎯"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={questForm.description}
                    onChange={(e) => setQuestForm({...questForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    placeholder="Quest description"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                    <select
                      value={questForm.type}
                      onChange={(e) => setQuestForm({...questForm, type: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="LOGIC">Logic</option>
                      <option value="MATH">Math</option>
                      <option value="HEALTH">Health</option>
                      <option value="SCHOLAR">Scholar</option>
                      <option value="EXPLORATION">Exploration</option>
                      <option value="STEWARDSHIP">Stewardship</option>
                      <option value="EVENT">Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                    <select
                      value={questForm.difficulty}
                      onChange={(e) => setQuestForm({...questForm, difficulty: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Attribute</label>
                    <select
                      value={questForm.attribute}
                      onChange={(e) => setQuestForm({...questForm, attribute: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="character">Character</option>
                      <option value="health">Health</option>
                      <option value="exploration">Exploration</option>
                      <option value="scholarship">Scholarship</option>
                      <option value="stewardship">Stewardship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">XP Reward</label>
                    <input
                      type="number"
                      value={questForm.xpReward}
                      onChange={(e) => setQuestForm({...questForm, xpReward: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Coin Reward</label>
                    <input
                      type="number"
                      value={questForm.coinReward}
                      onChange={(e) => setQuestForm({...questForm, coinReward: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Attribute Boost</label>
                    <input
                      type="number"
                      value={questForm.attributeBoost}
                      onChange={(e) => setQuestForm({...questForm, attributeBoost: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Min Level</label>
                    <input
                      type="number"
                      value={questForm.minLevel}
                      onChange={(e) => setQuestForm({...questForm, minLevel: parseInt(e.target.value) || 1})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (seconds)</label>
                    <input
                      type="number"
                      value={questForm.timeLimit || ''}
                      onChange={(e) => setQuestForm({...questForm, timeLimit: parseInt(e.target.value) || undefined})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="20"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center text-white">
                      <input
                        type="checkbox"
                        checked={questForm.isActive}
                        onChange={(e) => setQuestForm({...questForm, isActive: e.target.checked})}
                        className="mr-2"
                      />
                      Active
                    </label>
                  </div>
                </div>

                {/* Question Editor */}
                <div className="border-t border-gray-600 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Questions</h3>
                  
                  {/* Current Questions */}
                  {questForm.questions && questForm.questions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-md font-medium text-gray-300 mb-2">Current Questions ({questForm.questions.length})</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {questForm.questions.map((q, index) => (
                          <div key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium text-white">{q.q}</div>
                              <div className="text-sm text-gray-300">
                                Correct: {q.o[q.a]}
                              </div>
                            </div>
                            <button
                              onClick={() => removeQuestion(index)}
                              className="text-red-400 hover:text-red-300 ml-2"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add New Question */}
                  <div className="bg-gray-700 p-4 rounded-md">
                    <h4 className="text-md font-medium text-gray-300 mb-3">Add New Question</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Question</label>
                        <input
                          type="text"
                          value={currentQuestion.q}
                          onChange={(e) => setCurrentQuestion({...currentQuestion, q: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                          placeholder="Enter your question"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Options</label>
                        <div className="grid grid-cols-2 gap-2">
                          {currentQuestion.o.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={currentQuestion.a === index}
                                onChange={() => setCurrentQuestion({...currentQuestion, a: index})}
                                className="text-red-500"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...currentQuestion.o];
                                  newOptions[index] = e.target.value;
                                  setCurrentQuestion({...currentQuestion, o: newOptions});
                                }}
                                className="flex-1 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white"
                                placeholder={`Option ${index + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Select the radio button next to the correct answer
                        </div>
                      </div>
                      
                      <button
                        onClick={addQuestion}
                        disabled={!currentQuestion.q || !currentQuestion.o.every(o => o.trim())}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-md"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shop Item Form */}
            {activeTab === 'shop' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={shopForm.name}
                      onChange={(e) => setShopForm({...shopForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Item name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                    <input
                      type="text"
                      value={shopForm.icon}
                      onChange={(e) => setShopForm({...shopForm, icon: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="🎁"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={shopForm.description}
                    onChange={(e) => setShopForm({...shopForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    placeholder="Item description"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                    <select
                      value={shopForm.type}
                      onChange={(e) => setShopForm({...shopForm, type: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    >
                      <option value="AVATAR">Avatar</option>
                      <option value="SKIN">Skin</option>
                      <option value="BOOST">Boost</option>
                      <option value="CREDITS">Credits</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                    <input
                      type="number"
                      value={shopForm.price}
                      onChange={(e) => setShopForm({...shopForm, price: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Stock (optional)</label>
                    <input
                      type="number"
                      value={shopForm.stock || ''}
                      onChange={(e) => setShopForm({...shopForm, stock: parseInt(e.target.value) || undefined})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Unlimited"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Coin Bonus (optional)</label>
                    <input
                      type="number"
                      value={shopForm.coinBonus || ''}
                      onChange={(e) => setShopForm({...shopForm, coinBonus: parseInt(e.target.value) || undefined})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">XP Bonus (optional)</label>
                    <input
                      type="number"
                      value={shopForm.xpBonus || ''}
                      onChange={(e) => setShopForm({...shopForm, xpBonus: parseInt(e.target.value) || undefined})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                </div>

                {/* Attribute Boosts */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Attribute Boosts (optional)</label>
                  <div className="grid grid-cols-5 gap-2">
                    {['character', 'health', 'exploration', 'scholarship', 'stewardship'].map(attr => (
                      <div key={attr}>
                        <label className="block text-xs text-gray-400 mb-1 capitalize">{attr}</label>
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={shopForm.attributeBoosts?.[attr] || ''}
                          onChange={(e) => updateAttributeBoosts(attr, parseInt(e.target.value) || 0)}
                          className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={shopForm.isActive}
                      onChange={(e) => setShopForm({...shopForm, isActive: e.target.checked})}
                      className="mr-2"
                    />
                    Active
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={shopForm.isLimited}
                      onChange={(e) => setShopForm({...shopForm, isLimited: e.target.checked})}
                      className="mr-2"
                    />
                    Limited Stock
                  </label>
                </div>
              </div>
            )}

            {/* Achievement Form */}
            {activeTab === 'achievements' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={achievementForm.name}
                      onChange={(e) => setAchievementForm({...achievementForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="Achievement name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon</label>
                    <input
                      type="text"
                      value={achievementForm.icon}
                      onChange={(e) => setAchievementForm({...achievementForm, icon: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="🏆"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={achievementForm.description}
                    onChange={(e) => setAchievementForm({...achievementForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    placeholder="Achievement description"
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Required XP (optional)</label>
                    <input
                      type="number"
                      value={achievementForm.requiredXp || ''}
                      onChange={(e) => setAchievementForm({...achievementForm, requiredXp: parseInt(e.target.value) || undefined})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Required Level (optional)</label>
                    <input
                      type="number"
                      value={achievementForm.requiredLevel || ''}
                      onChange={(e) => setAchievementForm({...achievementForm, requiredLevel: parseInt(e.target.value) || undefined})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">XP Reward</label>
                    <input
                      type="number"
                      value={achievementForm.xpReward}
                      onChange={(e) => setAchievementForm({...achievementForm, xpReward: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Coin Reward</label>
                    <input
                      type="number"
                      value={achievementForm.coinReward}
                      onChange={(e) => setAchievementForm({...achievementForm, coinReward: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Required Attribute (optional)</label>
                  <input
                    type="text"
                    value={achievementForm.requiredAttribute || ''}
                    onChange={(e) => setAchievementForm({...achievementForm, requiredAttribute: e.target.value || undefined})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                    placeholder="e.g., character:50"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    Format: attribute:value (e.g., character:50, health:80)
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={achievementForm.isActive}
                      onChange={(e) => setAchievementForm({...achievementForm, isActive: e.target.checked})}
                      className="mr-2"
                    />
                    Active
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}