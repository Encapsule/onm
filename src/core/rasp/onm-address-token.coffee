###
------------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2015 Encapsule Project
  
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

**** Encapsule Project :: Build better software with circuit models ****

OPEN SOURCES: http://github.com/Encapsule HOMEPAGE: http://Encapsule.org
BLOG: http://blog.encapsule.org TWITTER: https://twitter.com/Encapsule

------------------------------------------------------------------------------



------------------------------------------------------------------------------

###
#
#
#

# ==============================================================================
module.exports = class AddressToken
    constructor: (model_, idExtensionPoint_, key_, idNamespace_) ->
        try
            # Save a reference to the specified model.
            @model = model_? and model_ or throw new Error("Missing object model input parameter.")

            # Now we work through the remaining parameters in reverse order.

            # Resolve the specified namespace's object model descriptor.
            if not idNamespace_? then throw new Error("Missing target namespace ID input parameter.")
            @idNamespace = idNamespace_
            @namespaceDescriptor = model_.implementation.getNamespaceDescriptorFromPathId(idNamespace_)

            # Resolve the specified namespace's component object model descriptor.
            @idComponent = @namespaceDescriptor.idComponent
            @componentDescriptor = model_.implementation.getNamespaceDescriptorFromPathId(@idComponent)

            keyRequired = @componentDescriptor.id > 0

            @key =  keyRequired and key_? and key_ or undefined
            @keyRequired = keyRequired and @key? and @key and true or false

            # If the token specifies the root component namespace, or any of the root component's subnamespaces
            # then @idExtensionPoint == -1 and @extensionPointDescriptor == undefined.
            @idExtensionPoint = -1
            @extensionPointDescriptor = undefined
            if @idComponent != 0
                if not (idExtensionPoint_? and idExtensionPoint_ and (idExtensionPoint_ != -1))
                    throw new Error "Missing required idExtensionPoint in-parameter value."
                @idExtensionPoint = idExtensionPoint_
                if idExtensionPoint_ != -1
                    @extensionPointDescriptor = @model.implementation.getNamespaceDescriptorFromPathId(@idExtensionPoint)
                    if @extensionPointDescriptor.namespaceType != 'extensionPoint'
                        throw new Error "Invalid extension point namespace ID '#{idExtensionPoint} specified '#{@idExtensionPoint_}'. Actually a r '#{@extensionPointDescriptor.namespaceType}."

            return

        catch exception
            throw new Error("AddressToken failure: #{exception}")

    #
    # ============================================================================
    clone: =>
        new AddressToken(
            @model
            @extensionPointDescriptor? and @extensionPointDescriptor and @extensionPointDescriptor.id or -1
            @key
            @namespaceDescriptor.id
            )


    #
    # ============================================================================
    isEqual: (token_) =>
        try
            if not (token_? and token_) then throw new Error("Missing token input parameter.")
            result = (@idNamespace == token_.idNamespace) and (@key == token_.key) and (@idExtensionPoint == token_.idExtensionPoint)
            return result

        catch exception
            throw "isEqual failure: #{exception}"

    #
    # ============================================================================
    isQualified: => not @keyRequired or (@key? and @key) or false


    #
    # ============================================================================
    isRoot: => not @componentId

#
#
# ****************************************************************************
# ****************************************************************************
