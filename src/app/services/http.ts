import { Component, OnInit } from '@angular/core';
import { ProtocolR } from '../models/Protocol';





/**
*
* @author Anthony Scheeres
*
*/
export async function fetchJsonGet(url) {
  let content: string = null;
  const rawResponse = await fetch(url, {
    method: ProtocolR.GET,
  });
  content = await rawResponse.text();
  // content)
  return content;
}



/**
*
* @author Anthony Scheeres
*
*/
export async function fetchPost(url) {
  let content: string = null;
  const rawResponse = await fetch(url, {
    method: ProtocolR.POST,
  });
  content = await rawResponse.text();
  // content)
  return content;
}



/**
*
* @author Anthony Scheeres
*
*/
export async function fetchJsonPost(url: string, data: string, methode: string) {
  let content: string = null;
  const rawResponse = await fetch(url, {
    method: methode,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  });
  content = await rawResponse.text();
  // content)
  return content;
}








