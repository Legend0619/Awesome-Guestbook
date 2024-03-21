export interface Visitor {
  id: string;
  name: string;
  email: string;
  department: 'IT' | 'Management' | 'Accounting' | 'Marketing' | 'Sales';
}