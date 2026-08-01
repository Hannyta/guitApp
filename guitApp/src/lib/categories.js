// Colores tomados de la paleta categórica validada de la skill dataviz
// (orden fijo, no se rota) para que cada categoría tenga una identidad estable.
export const DEFAULT_CATEGORIES = [
  { name: 'Comida y bebida', type: 'expense', color: '#eb6834', icon: 'food' },
  { name: 'Renta', type: 'expense', color: '#eda100', icon: 'home' },
  { name: 'Ocio', type: 'expense', color: '#e87ba4', icon: 'leisure' },
  { name: 'Transporte', type: 'expense', color: '#4a3aa7', icon: 'transport' },
  { name: 'Salud', type: 'expense', color: '#e34948', icon: 'health' },
  { name: 'Otros gastos', type: 'expense', color: '#898781', icon: 'other' },
  { name: 'Salario', type: 'income', color: '#2a78d6', icon: 'salary' },
  { name: 'Freelance', type: 'income', color: '#1baf7a', icon: 'laptop' },
  { name: 'Otros ingresos', type: 'income', color: '#008300', icon: 'coin' },
  { name: 'Saldo inicial', type: 'income', color: '#2a78d6', icon: 'bank' },
]

// Misma paleta categórica validada — se usa para que las categorías que cree
// el usuario elijan de un set con buen contraste/daltonismo, no un color libre.
export const CATEGORY_COLOR_OPTIONS = [
  '#2a78d6',
  '#eb6834',
  '#1baf7a',
  '#eda100',
  '#e87ba4',
  '#008300',
  '#7966e9',
  '#e34948',
  '#74f063',
  '#53d4c3',
  '#f7d366',
  '#854c91',
  '#773243',
  '#898781',
]
