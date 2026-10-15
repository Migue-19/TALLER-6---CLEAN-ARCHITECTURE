import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { GetAllCoursesUseCase } from '../../../core/application/usecases/get-all-courses.usecase';
import { COURSES_MOCK } from '../../../mocks/courses.mocks';
import { AlertComponent } from '../../components/alert/alert.component';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { CoursesPage } from './courses.page';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

  const GetAllCoursesUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPage, CoursesTableComponent],
    })
    .overrideComponent(CoursesPage, {
      set: {
        providers: [
          { provide: GetAllCoursesUseCase, useValue: GetAllCoursesUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.courses).toEqual([]);
  });

  it('debería solicitar 10 cursos al caso de uso', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(GetAllCoursesUseCaseMock.execute).toHaveBeenCalledWith(10);
  });

  it('debe cargar los cursos y cambiar el estado a success', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(component.courses).toEqual(COURSES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe renderizar la tabla de cursos cuando el estado es success', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.directive(CoursesTableComponent))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeNull();
  });

  it('no deberia cargar los cursos y cambiar el estado a error', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.courses).toEqual([]);
    expect(component.state).toBe('error');
  });

  it('debe renderizar la alerta de error cuando falla la carga', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alert).toBeTruthy();
    expect(alert.componentInstance.alertState).toBe('error');
  });

  it('debe renderizar la alerta de carga mientras no llegan los datos', () => {
    GetAllCoursesUseCaseMock.execute.mockReturnValue(of());
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.directive(AlertComponent));
    expect(component.state).toBe('loading');
    expect(alert.componentInstance.alertState).toBe('loading');
  });

});
