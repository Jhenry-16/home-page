import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideosCarrucelComponent } from './videos-carrucel.component';
import { MaterialModule } from '../../shared/components/material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideZonelessChangeDetection } from '@angular/core';

describe('VideosCarrucelComponent', () => {
  let component: VideosCarrucelComponent;
  let fixture: ComponentFixture<VideosCarrucelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosCarrucelComponent, MaterialModule, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VideosCarrucelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with currentIndex set to videos.length', () => {
    const N = component.videos.length;
    expect(component.currentIndex).toBe(N);
  });

  it('should have clonedVideos with length 3x of videos.length', () => {
    const N = component.videos.length;
    expect(component.clonedVideos.length).toBe(3 * N);
  });

  it('should map activeIndex correctly', () => {
    const N = component.videos.length;
    component.currentIndex = N;
    expect(component.activeIndex).toBe(0);

    component.currentIndex = N + 1;
    expect(component.activeIndex).toBe(1);

    component.currentIndex = N - 1;
    expect(component.activeIndex).toBe(N - 1);
  });

  it('should increment currentIndex when nextSlide is called', () => {
    const initialIndex = component.currentIndex;
    component.nextSlide(false);
    expect(component.currentIndex).toBe(initialIndex + 1);
  });

  it('should decrement currentIndex when prevSlide is called', () => {
    const initialIndex = component.currentIndex;
    component.prevSlide();
    expect(component.currentIndex).toBe(initialIndex - 1);
  });

  it('should navigate via goToSlide using shortest path', () => {
    const N = component.videos.length;

    component.currentIndex = N;
    component.goToSlide(3);

    expect(component.currentIndex).toBe(N + 3);
  });

  describe('onTransitionEnd snapping', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should snap currentIndex to middle segment when transition ends past boundaries', () => {
      const N = component.videos.length;

      // Simulate crossing the upper boundary (e.g. index 2 * N)
      component.currentIndex = 2 * N;
      component.onTransitionEnd();

      expect(component.currentIndex).toBe(N);
      expect(component.transitionEnabled).toBeFalse();

      // After 50ms, transitionEnabled should be restored to true
      jasmine.clock().tick(50);
      expect(component.transitionEnabled).toBeTrue();
    });

    it('should snap currentIndex to middle segment when transition ends before boundaries', () => {
      const N = component.videos.length;

      // Simulate crossing the lower boundary (e.g. index < N)
      component.currentIndex = N - 1;
      component.onTransitionEnd();

      expect(component.currentIndex).toBe(2 * N - 1);
      expect(component.transitionEnabled).toBeFalse();

      // After 50ms, transitionEnabled should be restored to true
      jasmine.clock().tick(50);
      expect(component.transitionEnabled).toBeTrue();
    });
  });

  it('should generate correct track transform string', () => {
    component.currentIndex = 4;
    const transform = component.getTrackTransform();
    expect(transform).toContain('calc(-1 * var(--half-card-width) - 4 * var(--card-outer-width))');
  });
});
