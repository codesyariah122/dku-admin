import Vue from 'vue';
import truncateHtml from 'truncate-html';

Vue.filter('truncateHtml', function (value, maxLength) {
  return truncateHtml(value, maxLength);
});
