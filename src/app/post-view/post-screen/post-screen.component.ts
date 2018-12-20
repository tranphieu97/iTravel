import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/core/services/server.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-screen',
  templateUrl: './post-screen.component.html',
  styleUrls: ['./post-screen.component.scss']
})
export class PostScreenComponent implements OnInit {
  // local post receive data from server
  // it should has init data until receiving data from server so browser will not has error
  // post: Post = new Post(null, null, [], [], '', '', '', new Location('', [], '', ''), [], 0, '', [], '');
  postId = '';

  constructor(private serverService: ServerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
      // check valid post Id or not
      if (this.postId.length !== 24) {
        // invalid => not-found
        this.router.navigate(['/not-found']);
      }
    });
  }
}
