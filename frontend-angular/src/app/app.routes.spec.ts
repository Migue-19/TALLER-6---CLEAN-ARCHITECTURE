import { routes } from './app.routes';
import { CoursesPage } from './presentation/pages/courses/courses.page';
import { ProductsPage } from './presentation/pages/products/products.page';
import { UsersPage } from './presentation/pages/users/users.page';

describe('routes', () => {

  it('debería definir la ruta de usuarios', () => {
    expect(routes.find(r => r.path === 'users')?.component).toBe(UsersPage);
  });

  it('debería definir la ruta de productos', () => {
    expect(routes.find(r => r.path === 'products')?.component).toBe(ProductsPage);
  });

  it('debería definir la ruta de cursos', () => {
    expect(routes.find(r => r.path === 'courses')?.component).toBe(CoursesPage);
  });

  it('debería redirigir cualquier ruta desconocida a usuarios', () => {
    expect(routes.find(r => r.path === '**')?.redirectTo).toBe('users');
  });

  it('debería tener una ruta por cada opción del navbar', () => {
    const paths = routes.map(r => r.path);
    ['users', 'products', 'courses'].forEach(path => expect(paths).toContain(path));
  });

});
