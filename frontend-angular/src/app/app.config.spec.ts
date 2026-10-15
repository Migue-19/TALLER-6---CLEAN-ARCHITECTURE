import { TestBed } from '@angular/core/testing';
import { appConfig } from './app.config';
import { CourseRepository } from './core/domain/repositories/course.repository';
import { ProductRepository } from './core/domain/repositories/product.repository';
import { UserRepository } from './core/domain/repositories/user.repository';
import { CourseLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/course-local.repository.impl';
import { ProductLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/product-local.repository.impl';
import { UserLocalRepositoryImpl } from './core/infrastructure/repositories/local-implementation/user-local.repository.impl';

describe('appConfig (Providers)', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: appConfig.providers });
  });

  it('debería definir los providers de la aplicación', () => {
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });

  it('debería proveer una implementación para el repositorio de usuarios', () => {
    expect(TestBed.inject(UserRepository)).toBeInstanceOf(UserLocalRepositoryImpl);
  });

  it('debería proveer una implementación para el repositorio de productos', () => {
    expect(TestBed.inject(ProductRepository)).toBeInstanceOf(ProductLocalRepositoryImpl);
  });

  it('debería proveer una implementación para el repositorio de cursos', () => {
    expect(TestBed.inject(CourseRepository)).toBeInstanceOf(CourseLocalRepositoryImpl);
  });

});
