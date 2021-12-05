// Custom Components
// layout
import Layout from '@/components/framework/layout/layout';
import Page from '@/components/framework/layout/page';
import PagePath from '@/components/framework/layout/pagePath';
import PageQuery from '@/components/framework/layout/pageQuery';
import QueryCol from '@/components/framework/layout/queryCol';
import PageButtons from '@/components/framework/layout/pageButtons';
import PageDialog from '@/components/framework/layout/pageDialog';
import PageData from '@/components/framework/layout/pageData';
import FormCol from '@/components/framework/layout/formCol';
import PageWfProcess from '@/components/framework/layout/pageWfProcess';
// plugins
import DropdownList from '@/components/framework/plugins/dropdownList';
import Datagrid from '@/components/framework/plugins/datagrid';
import CheckboxList from '@/components/framework/plugins/checkboxList';
import RadioList from '@/components/framework/plugins/radioList';
import DatagridPicker from '@/components/framework/plugins/datagridPicker';
import DatagridDialog from '@/components/framework/plugins/datagridDialog';
import UserPicker from '@/components/framework/plugins/userPicker';
import UserPickerJcis from '@/components/framework/plugins/userPickerJcis';
import TreeView from '@/components/framework/plugins/treeView';
import TreeTable from '@/components/framework/plugins/treeTable';
import TreePicker from '@/components/framework/plugins/treePicker';
import TreeDialog from '@/components/framework/plugins/treeDialog';
import OUPicker from '@/components/framework/plugins/ouPicker';
import EXPPicker from '@/components/framework/plugins/expPicker';
import EXPVIEWPicker from '@/components/framework/plugins/expviewPicker';
import EXPHALLPicker from '@/components/framework/plugins/exphallPicker';
import DatagridEditCell from '@/components/framework/plugins/datagridEditCell';
import Treegrid from '@/components/framework/plugins/treegrid';
import TreegridCell from '@/components/framework/plugins/treegridCell';
import sysFeedback from '@/components/framework/plugins/sysFeedback';
import confirmButton from '@/components/framework/plugins/confirmButton';

// Page Template
import SingleTablePage from '@/components/framework/pageTemplate/singleTablePage';
import DatagridSelector from '@/components/framework/plugins/datagridSelector';
import ElUploadPicker from '@/components/framework/plugins/uploadPicker';
import ElReportView from '@/components/framework/plugins/reportView';
import ELMenuTree from '@/components/framework/plugins/menuTree';


// defined
const layout = [Layout, Page, PagePath, PageQuery, QueryCol, PageButtons, PageDialog, FormCol, PageData, PageWfProcess];
const plugins = [Datagrid, DropdownList, CheckboxList, RadioList, DatagridPicker, DatagridDialog, UserPicker, UserPickerJcis,
  TreeView, TreeTable, TreePicker, TreeDialog, OUPicker, EXPPicker, EXPVIEWPicker, EXPHALLPicker, DatagridEditCell, Treegrid, TreegridCell, sysFeedback, DatagridSelector,
  ElUploadPicker, ElReportView, ELMenuTree, confirmButton];
const pageTemplates = [SingleTablePage];

export default {
  register: (Vue) => {
    ([].concat(layout, plugins, pageTemplates)).forEach((component) => {
      Vue.component(component.name, component);
    });
  }
};
