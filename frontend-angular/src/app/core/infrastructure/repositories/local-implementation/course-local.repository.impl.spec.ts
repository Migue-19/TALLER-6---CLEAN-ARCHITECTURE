import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COURSES_MOCK } from '../../../../mocks/courses.mocks';
import { Course } from '../../../domain/models/course.model';
import { DataService } from '../../services/data.service';
import { CourseLocalRepositoryImpl } from './course-local.repository.impl';

describe('CourseLocalRepositoryImpl (Infrastructure)', () => {
  let repository: CourseLocalRepositoryImpl;

  const countCourses = 5;
  const DataServiceMock = {  getAllCoursesLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            CourseLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(CourseLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCoursesLocal()', () => {
    const getAllSpy = DataServiceMock.getAllCoursesLocal.mockReturnValue(of([]));
    repository.getAll(countCourses).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countCourses);
  });

  it('debe devolver el listado de courseos como Observable', (done) => {
    DataServiceMock.getAllCoursesLocal.mockReturnValue(of(COURSES_MOCK))
    repository.getAll(countCourses).subscribe((courses: Course[]) => {
      expect(courses).toEqual(COURSES_MOCK);
      done();
    });
  });
});
