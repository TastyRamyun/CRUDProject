import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as UserActions from './user.actions';
import { User } from '../models/user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.http.get<User[]>('assets/users.json').pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError(() => of({ type: '[User] Load Users Failure' }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}