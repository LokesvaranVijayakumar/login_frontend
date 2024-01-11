import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateemployeebyadminComponent } from './updateemployeebyadmin.component';

describe('UpdateemployeebyadminComponent', () => {
  let component: UpdateemployeebyadminComponent;
  let fixture: ComponentFixture<UpdateemployeebyadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateemployeebyadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateemployeebyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
