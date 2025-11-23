import { type FormEvent, useState } from 'react';

// Define interfaces based on schema
interface Item {
  id: number;
  name: string;
  description: string;
  stock_quantity: number;
  department_id: number | null;
}

interface Issuance {
  id: number;
  item_id: number;
  issued_by: number;
  issued_to: number | null;
  quantity: number;
  issued_at: string;
}

// Mock data for items (same as Inventory.tsx for consistency)
const mockItems: Item[] = [
  { id: 1, name: 'Branded T-Shirt', description: 'Company logo T-shirt', stock_quantity: 50, department_id: 1 },
  { id: 2, name: 'Event Banner', description: 'Marketing event banner', stock_quantity: 10, department_id: 2 },
  { id: 3, name: 'Mechanic Uniform', description: 'Service team uniform', stock_quantity: 20, department_id: 3 },
  { id: 4, name: 'Promotional Cap', description: 'Branded cap for giveaways', stock_quantity: 100, department_id: 2 },
  { id: 5, name: 'General Item', description: 'Available to all', stock_quantity: 30, department_id: null },
];

// Mock data for issuance records
const mockIssuances: Issuance[] = [
  { id: 1, item_id: 1, issued_by: 1, issued_to: 2, quantity: 5, issued_at: '2025-08-01T10:00:00Z' },
  { id: 2, item_id: 2, issued_by: 3, issued_to: 4, quantity: 2, issued_at: '2025-08-02T12:00:00Z' },
  { id: 3, item_id: 3, issued_by: 5, issued_to: 6, quantity: 3, issued_at: '2025-08-03T14:00:00Z' },
];

// Mock departments
const departments: Record<number, string> = {
  1: 'HR',
  2: 'Marketing',
  3: 'Service',
};

// Mock users for display
const users: Record<number, string> = {
  1: 'Jane (HR Officer)',
  2: 'John (Employee)',
  3: 'Alice (Marketing Officer)',
  4: 'Bob (Employee)',
  5: 'Charlie (Service Officer)',
  6: 'Dave (Employee)',
};

function Issuance() {
  const [itemId, setItemId] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [quantity, setQuantity] = useState('');

  // Simulate user for testing (replace with AuthContext later)
  const mockUser = { role: 'officer', department_id: 1 }; // Change to { role: 'admin', department_id: null } to test Admin view

  // Filter items and issuances based on role
  const filteredItems = mockUser.role === 'admin'
    ? mockItems
    : mockItems.filter(item => item.department_id === mockUser.department_id || item.department_id === null);
  const filteredIssuances = mockUser.role === 'admin'
    ? mockIssuances
    : mockIssuances.filter(issuance => {
        const item = mockItems.find(item => item.id === issuance.item_id);
        return item && (item.department_id === mockUser.department_id || item.department_id === null);
      });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for issuing item (to be connected to backend later)
    console.log('New issuance:', {
      item_id: Number(itemId),
      issued_by: mockUser.role === 'admin' ? 1 : mockUser.department_id,
      issued_to: issuedTo ? Number(issuedTo) : null,
      quantity: Number(quantity),
      issued_at: new Date().toISOString(),
    });
    // Reset form
    setItemId('');
    setIssuedTo('');
    setQuantity('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Issuance Management</h2>

      {/* Form to issue items (available to Admins and Officers) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Issue Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
              Item
            </label>
            <select
              id="itemId"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select an item</option>
              {filteredItems.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.stock_quantity} in stock)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="issuedTo" className="block text-sm font-medium text-gray-700">
              Issued To (Optional)
            </label>
            <select
              id="issuedTo"
              value={issuedTo}
              onChange={(e) => setIssuedTo(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None</option>
              {Object.entries(users).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Issue Item
          </button>
        </form>
      </div>

      {/* Issuance Records Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Issuance Records</h3>
        {filteredIssuances.length === 0 ? (
          <p className="text-gray-600">No issuance records available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIssuances.map(issuance => (
                  <tr key={issuance.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {mockItems.find(item => item.id === issuance.item_id)?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {users[issuance.issued_by] || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issuance.issued_to ? users[issuance.issued_to] : 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {issuance.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(issuance.issued_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Issuance;