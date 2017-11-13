# frozen_string_literal: true
require "gems"
require "ripper"
require "pp"

# Gfile class for parsing and getting gem info
class Gfile
  attr_reader :gems

  def initialize(file)
    # Access Variables
    @gems = []

    # Hidden variables
    @file = IO.read(file)
    @p_file = Ripper.sexp(@file)
    @gems_array = []
    gems_search(@p_file)
    gem_search(@gems_array)
    gem_info
  end

  private

  def gems_search(array)
    array.each do |x|
      if x.class == Array && x[0] == :command
        @gems_array << x
      elsif x.class == Array
        gems_search(x)
      end
    end
  end

  def arg_search(array)
    @args = []
    r_arg_search(array)
    @args
  end

  def r_arg_search(array)
    array.each do |x|
      if x.class == Array && x[0] == :@tstring_content
        @args << x[1]
      elsif x.class == Array
        r_arg_search(x)
      end
    end
  end

  def gem_search(array)
    array.each do |x|
      @gems << arg_search(x) if x[1][1] == "gem"
    end
  end

  def gem_info
    @gems.each_with_index do |g, i|
      gem_info = Gems.info g[0]
      @gems[i] << gem_info
    end
  end
end
