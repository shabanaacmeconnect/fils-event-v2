import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endsidebar',
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss']
})

/**
 * Rightsidebar component
 */
export class RightsidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

}
