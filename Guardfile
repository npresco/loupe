guard "livereload" do
  extensions = {
    css: :css,
    js: :js
  }

  # file types LiveReload may optimize refresh for
  compiled_exts = extensions.values.uniq
  watch(%r{dist/public/.+\.(#{compiled_exts * '|'})})

  # file needing a full reload of the page anyway
  watch(%r{dist/views/.+\.(slim)$})
end
