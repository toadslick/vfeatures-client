import { cloneElement } from 'react';
import { PromiseState } from 'react-refetch';

const pendingClass = 'form-busy';
const rejectedClass = 'form-error';

export default function formWrapper(requests, element) {
  const { pending, rejected } = PromiseState.all(requests);
  let disabled = false;
  let className = '';
  if (pending) {
    disabled = true;
    className = pendingClass;
  }
  if (rejected) {
    className = rejectedClass;
  }
  className = element.props.className + ' ' + className;
  return cloneElement(element, { disabled, className });
}
