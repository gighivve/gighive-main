// ignore_for_file: avoid_web_libraries_in_flutter
// ignore: deprecated_member_use
import 'dart:html' as html;

void removeLoadingIndicator() {
  html.document.getElementById('loading')?.remove();
}
