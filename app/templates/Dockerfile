# ------------------------------------------------------
#                       Dockerfile
# ------------------------------------------------------
# image:    <%= playbookName %>
# tag:      <%= playbookVersionTag %>
# name:     <%= playbookOwner %>/<%= playbookName %>
# version:  <%= playbookVersion %>
# repo:     <%= playbookRepo %>
# how-to:   docker build --force-rm -t <%= playbookOwner %>/<%= playbookName %> .
# requires: !!...Fill Me In...!!
# authors:  <%= playbookOwnerEmail %>
# desc: <%= playbookDesc %>
# <%= generatorTag %>
# ------------------------------------------------------

FROM ansibleshipyard/ansible-base-ubuntu
MAINTAINER <%= playbookOwner %>

# -----> Env
ENV WORKDIR /tmp/build/roles/<%= playbookName %>
WORKDIR /tmp/build/roles/<%= playbookName %>

# -----> Add assets
ADD ./defaults $WORKDIR/defaults
ADD ./files $WORKDIR/files
ADD ./handlers $WORKDIR/handlers
ADD ./meta $WORKDIR/meta
ADD ./tasks $WORKDIR/tasks
ADD ./templates $WORKDIR/templates
ADD ./vars $WORKDIR/vars
ADD ./ci $WORKDIR/ci

# -----> Install Galaxy Dependencies

# -----> Execute
RUN ansible-playbook -i $WORKDIR/ci/inventory $WORKDIR/ci/playbook.yml -c local -vvvv

# -----> Cleanup
WORKDIR /
RUN rm -R /tmp/build
