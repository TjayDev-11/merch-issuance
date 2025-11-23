import { type FormEvent, useState } from 'react';

// Define the Item interface based on the schema
interface Item {
  id: number;
  name: string;
  description: string;
  stock_quantity: number;
  department_id: number | null;
}

// Mock data for testing (replace with API calls later)
const mockItems: Item[] = [
  { id: 1, name: 'Branded T-Shirt', description: 'Company logo T-shirt', stock_quantity: 50, department_id: 1 },
  { id: 2, name: 'Event Banner', description: 'Marketing event banner', stock_quantity: 10, department_id: 2 },
  { id: 3, name: 'Mechanic Uniform', description: 'Service team uniform', stock_quantity: 20, department_id: 3 },
  { id: 4, name: 'Promotional Cap', description: 'Branded cap for giveaways', stock_quantity: 100, department_id: 2 },
  { id: 5, name: 'General Item', description: 'Available to all', stock_quantity: 30, department_id: null },
];

// Mock departments for display
const departments: Record<number, string> = {
  1: 'HR',
  2: 'Marketing',
  3: 'Service',
};

function Inventory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [departmentId, setDepartmentId] = useState('');

  // Simulate user for testing (replace with AuthContext later)
  const mockUser = { role: 'admin', department_id: null }; // Change to { role: 'officer', department_id: 1 } to test Officer view
  const isAdmin = mockUser.role === 'admin';

  // Filter items based on role (placeholder for AuthContext)
  const filteredItems = isAdmin
    ? mockItems
    : mockItems.filter(item => item.department_id === mockUser.department_id || item.department_id === null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder for adding item (to be connected to backend later)
    console.log('New item:', { name, description, stock_quantity: Number(stockQuantity), department_id: departmentId ? Number(departmentId) : null });
    // Reset form
    setName('');
    setDescription('');
    setStockQuantity('');
    setDepartmentId('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Management</h2>

      {/* Admin-only form to add new items */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stockQuantity"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                Department (Optional)
              </label>
              <select
                id="departmentId"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">None (Available to all)</option>
                {Object.entries(departments).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add Item
            </button>
          </form>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Inventory List</h3>
        {filteredItems.length === 0 ? (
          <p className="text-gray-600">No items available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.stock_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.department_id ? departments[item.department_id] : 'All'}
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

export default Inventory;