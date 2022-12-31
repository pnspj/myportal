export function create() {
  const linkGroupsContainers = document.getElementsByClassName(
    "link-groups-container"
  );
  const map = (htmlCollection, f) =>
    Array.prototype.map.call(htmlCollection, f);

  // TODO parallelize
  map(linkGroupsContainers, (linkGroupsContainer) =>
    map(linkGroupsContainer.children, (linkGroups) =>
      createLinkGroupsDom(linkGroups.id)
    )
  );
}

async function createLinkGroupsDom(id) {
  const dom = document.getElementById(id);
  dom.className = "link-groups";

  const json = await getJson(id);
  json.linkGroups.map((linkGropup) =>
    dom.appendChild(createLinkGroupDom(linkGropup))
  );
}

async function getJson(id) {
  const response = await fetch(`./json/${id}.json`);
  const json = await response.json();
  return json;
}

function createLinkGroupDom(linkGroup) {
  const dom = document.createElement("details");
  dom.className = "link-group";
  dom.open = true;
  dom.appendChild(createGroupNameDom(linkGroup.groupName));
  linkGroup.links.map((link) => {
    dom.appendChild(createLinkDom(link));
  });
  return dom;
}

function createGroupNameDom(groupName) {
  const dom = document.createElement("summary");
  dom.className = "group-name";
  dom.appendChild(document.createTextNode(groupName));
  return dom;
}

function createLinkDom(link) {
  const dom = document.createElement("div");
  dom.className = "link-item-container";
  dom.appendChild(createAnchorDom(link));
  return dom;
}

function createAnchorDom(link) {
  const dom = document.createElement("a");
  dom.className = "link-item";
  dom.text = link.text;
  dom.href = link.url;
  dom.target = "_blank";
  return dom;
}
